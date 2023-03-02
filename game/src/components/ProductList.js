import React from 'react';
import { View, Text, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import {useDispatch} from 'react-redux';
import {getUser} from '../redux/action';
const productosCollection = firestore().collection('productos');
const usuariosCollection = firestore().collection('usuarios');

export const comprarProducto = async (producto, usuarioId) => {

    const usuarioRef = usuariosCollection.doc(usuarioId);
  
    try {
      await firestore().runTransaction(async (transaction) => {
        const usuarioSnapshot = await transaction.get(usuarioRef);
        const usuario = usuarioSnapshot.data();
  
        // Verificar que el usuario tenga suficientes coins para comprar el producto
        if (usuario.coins < producto.valor) {
          throw new Error('El usuario no tiene suficientes coins para comprar este producto.');
        }
  
        // Restar el precio del producto de los coins del usuario
        const nuevoSaldoCoins = usuario.coins - producto.valor;
        transaction.update(usuarioRef, { coins: nuevoSaldoCoins });
  
        // Restar la cantidad de productos disponibles
        const productoRef = productosCollection.doc(producto.id);
        const productoSnapshot = await transaction.get(productoRef);
        const cantidadDisponible = productoSnapshot.data().cantidad;
        if (cantidadDisponible < 1) {
          throw new Error('No hay suficientes unidades disponibles de este producto.');
        }
        transaction.update(productoRef, { cantidad: cantidadDisponible - 1 });

      });
      console.log('Compra exitosa');
    } catch (error) {
      console.error('Error al realizar la compra:', error.message);
    }
  };

const ProductosList = ({ productos, usuarioId }) => {
    const dispatch = useDispatch()
  const handleComprar = async (producto) => {
    await comprarProducto(producto, usuarioId);
   dispatch(getUser(usuarioId))
  };

  return (
    <View>
      {productos.map((producto) => (
        <View key={producto.id}>
          <Text style={{color:'#000'}}>{producto.nombre}</Text>
          <Text style={{color:'#000'}}>Precio: {producto.valor} coins</Text>
          <Text style={{color:'#000'}}>Cantidad disponible: {producto.cantidad}</Text>
          <Button title="Comprar" onPress={() => handleComprar(producto)} />
        </View>
      ))}
    </View>
  );
};

export default ProductosList