import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import {Alert} from 'react-native';
import axios from "axios";
import {GET_ERROR,GET_MESSAGE,GET_QUESTION,GET_USER} from "./constants";
import { useNavigation } from "@react-navigation/native";
import {setUser, setPartidas, setUsers, setErrors, setPartidaSeleccionada, setQuestion} from "./reducer";
const productosCollection = firestore().collection('productos');
const usuariosCollection = firestore().collection('usuarios');



export const registro = (email, password) => {
  return async() =>{
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
   
    const user = userCredential.user
    const userId = userCredential.user.uid;
    await firestore().collection('usuarios').doc(userId).set({
      displayName: user.displayName, 
      email: user.email, 
      emailVerified: user.emailVerified, 
      isAnonymous: user.isAnonymous, 
      phoneNumber: user.phoneNumber, 
      photoURL: user.photoURL, 
      providerId: user.providerId, 
      tenantId: user.tenantId, 
      coins: 1000,
      diamonds: 10,
      live: 5
      
    });
    
  } catch (error) {
    Alert.alert('Error', 'No se pudo crear la cuenta');
    console.log(error)
  }
}
};
export const obtenerPartidas = () => {
  return async(dispatch) => {
   
      const usuarioActual = auth().currentUser;
      if (usuarioActual) {
        firestore().collection('partidas')
          .where('jugadores', 'array-contains', usuarioActual.uid)
          .onSnapshot((snapshot) => {
            const partidasData = [];
            snapshot.forEach((doc) => {
              partidasData.push({ id: doc.id, ...doc.data() });
            });
           
            dispatch(setPartidas(partidasData));
          });
      }
    
  }
}

export const logout = () => {
  return async (dispatch) => {
    try {
      await auth().signOut();
      // dispatch de cualquier acción adicional que necesites
      return dispatch(setUser(null))
    } catch (error) {
      console.error(error);
      // dispatch de cualquier acción para manejar el error
    }
  };
};

export const crearPartida = (partidaNombre,jugadores) => {
  return async(dispatch) => {
    
    try {
    console.log('partida creada')
    const partidaRef = await firestore()
      .collection('partidas')
      .add({
        nombre: partidaNombre,
        jugadores,
      });

    /* const usuarioRef = await firestore()
      .collection('usuarios')
      .doc(userId)
      .set({
        nombre: user,
        partida: partidaRef.id,
      }); */

    // Aquí es donde utilizamos la acción
    dispatch(setPartidaSeleccionada({ id: partidaRef.id, nombre: partidaNombre }));

  } catch (error) {
    console.error(error);
  }
}
};


export const comprarProducto = async (producto, usuarioId) => {
  const usuarioRef = usuariosCollection.doc(usuarioId);

  try {
    await firestore().runTransaction(async (transaction) => {
      const usuarioSnapshot = await transaction.get(usuarioRef);
      const usuario = usuarioSnapshot.data();

      // Verificar que el usuario tenga suficientes coins para comprar el producto
      if (usuario.coins < producto.precio) {
        throw new Error('El usuario no tiene suficientes coins para comprar este producto.');
      }

      // Restar el precio del producto de los coins del usuario
      const nuevoSaldoCoins = usuario.coins - producto.precio;
      transaction.update(usuarioRef, { coins: nuevoSaldoCoins });

      // Restar la cantidad de productos disponibles
      const productoRef = productosCollection.doc(producto.id);
      const productoSnapshot = await transaction.get(productoRef);
      const cantidadDisponible = productoSnapshot.data().cantidadDisponible;
      if (cantidadDisponible < 1) {
        throw new Error('No hay suficientes unidades disponibles de este producto.');
      }
      transaction.update(productoRef, { cantidadDisponible: cantidadDisponible - 1 });
    });
    console.log('Compra exitosa');
  } catch (error) {
    console.error('Error al realizar la compra:', error.message);
  }
};


export const getUsers =() => {
  return async(dispatch) => {
    try {
      const usuariosRef = firestore().collection('usuarios');
      
        usuariosRef.onSnapshot((snapshot) => {
          const usuarios = snapshot.docs.map((doc) => ({
            uid: doc.id,
            ...doc.data()
            
          }));
          dispatch(setUsers(usuarios));
        });
      
    } catch (error) {
      dispatch(setErrors(error))
    }
  
  }
}
export const getQuestion = () => {
  return async (dispatch) => {
    try {
      const questionRef = firestore().collection('question');
      const randomDoc = await questionRef.limit(1).getRandomDocument();
      dispatch(setQuestion(randomDoc.data()));
    } catch (error) {
      console.log(error);
    }
  };
};



export const createUser = (user) => {
  return async (dispatch) => {
    try {
     const newUser = await axios.post('http://192.168.1.13:5174/register',user)
     dispatch({
      type: GET_MESSAGE,
      payload: newUser.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERROR,
      payload: error,
    });
  }
}
}

export const getUser = (userUid) => {
  return async (dispatch) => {
    try {
      const usuarioRef = firestore().collection('usuarios').doc(userUid);
      const unsubscribe = usuarioRef.onSnapshot((snapshot) => {
        dispatch(setUser(snapshot.data()));
      })
      return unsubscribe;
    } catch (error) {
      dispatch(setErrors(error));
    }
  }
}