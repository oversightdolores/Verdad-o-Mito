import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import ProductosList from '../components/ProductList';

const Tienda = () => {
const [productos, setProductos] = useState([]);
const [usuarioId, setUsuarioId] = useState(null);

useEffect(() => {
// Obtener ID del usuario actual
const unsubscribe = auth().onAuthStateChanged((usuario) => {
if (usuario) {
setUsuarioId(usuario.uid);
}
});


// Obtener lista de productos
const productosCollection = firestore().collection('productos');
const unsubscribeProductos = productosCollection.onSnapshot((snapshot) => {
  const nuevosProductos = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  setProductos(nuevosProductos);
});
console.log(productos)
return () => {
  unsubscribe();
  unsubscribeProductos();
};
}, []);

return (
<View>
<Text style={{color:'#000'}}>Tienda</Text>
{productos.length > 0 && usuarioId && (
<ProductosList productos={productos} usuarioId={usuarioId} />
)}
</View>
);
};

export default Tienda;