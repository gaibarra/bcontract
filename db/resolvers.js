const Usuario = require('../models/Usuario');
const Tipo = require('../models/Tipos');
const parte1 = require('../models/Parte');
const parte2 = require('../models/Parte');
const Contrato = require('../models/Contrato');

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Parte = require('../models/Parte');
require('dotenv').config({ path: 'variables.env' });


const crearToken = (usuario, secreta, expiresIn) => {
    console.log(usuario);
    const { id, email,nombre, apellido } = usuario;

    return jwt.sign( { id, email, nombre, apellido }, secreta, { expiresIn } )
}

// Resolvers
const resolvers = {
    Query: {
        obtenerUsuario: async (_, {}, ctx) => {
            return ctx.usuario;
        }, 
        obtenerTipos: async () => {
            try {
                const tipos = await Tipo.find({});
                return tipos;
            } catch (error) {
                console.log(error);
            }
        }, 
        obtenerTipo: async (_, { id }) => {
            // revisar si el producto existe o no
            const tipo = await Tipo.findById(id);

            if(!tipo) {
                throw new Error('Tipo de contrato no encontrado');
            }

            return tipo;
        },
        
        obtenerPartes: async () => {
            try {
                const partes = await Parte.find({});
                return partes;
            } catch (error) {
                console.log(error);
            }
        }, 
        obtenerPartesVendedor: async (_, {}, ctx ) => {
            try {
                const partes = await Parte.find({ vendedor: ctx.usuario.id.toString() });
                return partes;
            } catch (error) {
                console.log(error);
            }
        }, 
        obtenerParte: async (_, { id }, ctx) => {
            // Revisar si el cliente existe o no
            const parte = await Parte.findById(id);

            if(!parte) {
                throw new Error('No encontrado');
            }

            // Quien lo creo puede verlo
            if(parte.vendedor.toString() !== ctx.usuario.id ) {
                throw new Error('No tienes las credenciales');
            }

            // return PaymentResponse;
            return parte; 
        }, 
        obtenerContratos: async () => {
            try {
                const contratos = await Contrato.find({});
                return contratos;
            } catch (error) {
                console.log(error);
            }
        }, 
        obtenerContratosVendedor: async (_, {}, ctx) => {
        
            try { 
                const contratos = await Contrato.find({ vendedor: ctx.usuario.id });

                // console.log(pedidos);
                return contratos;
            } catch (error) {
                console.log(error);
            }
        }, 
        obtenerContrato: async(_, {id}, ctx) => {
            // Si el pedido existe o no
            const contrato = await Contrato.findById(id);
            if(!contrato) {
                throw new Error('Contrato no encontrado');
            }

            // Solo quien lo creo puede verlo
            if(contrato.vendedor.toString() !== ctx.usuario.id) {
                throw new Error('No tienes las credenciales');
            }

            // retornar el resultado
            return contrato;
        }, 
        // obtenerPedidosEstado: async (_, { estado }, ctx) => {
        //     const pedidos = await Pedido.find({ vendedor: ctx.usuario.id, estado });

        //     return pedidos;
        // },
        // mejoresClientes: async () => {
        //     const clientes = await Pedido.aggregate([
        //         { $match : { estado : "COMPLETADO" } },
        //         { $group : {
        //             _id : "$cliente", 
        //             total: { $sum: '$total' }
        //         }}, 
        //         {
        //             $lookup: {
        //                 from: 'clientes', 
        //                 localField: '_id',
        //                 foreignField: "_id",
        //                 as: "cliente"
        //             }
        //         }, 
        //         {
        //             $limit: 10
        //         }, 
        //         {
        //             $sort : { total : -1 }
        //         }
        //     ]);

        //     return clientes;
        // }, 
        // mejoresVendedores: async () => {
        //     const vendedores = await Pedido.aggregate([
        //         { $match : { estado : "COMPLETADO"} },
        //         { $group : {
        //             _id : "$vendedor", 
        //             total: {$sum: '$total'}
        //         }},
        //         {
        //             $lookup: {
        //                 from: 'usuarios', 
        //                 localField: '_id',
        //                 foreignField: '_id',
        //                 as: 'vendedor'
        //             }
        //         }, 
        //         {
        //             $limit: 3
        //         }, 
        //         {
        //             $sort: { total : -1 }
        //         }
        //     ]);

        //     return vendedores;
        // },
        // buscarProducto: async(_, { texto }) => {
        //     const productos = await Producto.find({ $text: { $search: texto  } }).limit(10)

        //     return productos;
        // }
    }, 
    Mutation: {
        nuevoUsuario: async (_, { input } ) => {

            const { email, password } = input;
            
            // Revisar si el usuario ya esta registrado
            const existeUsuario = await Usuario.findOne({email});
            if (existeUsuario) {
                throw new Error('El usuario ya esta registrado');
            }

            // Hashear su password
            const salt = await bcryptjs.genSalt(10);
            input.password = await bcryptjs.hash(password, salt);

            try {
                 // Guardarlo en la base de datos
                const usuario = new Usuario(input);
                usuario.save(); // guardarlo
                return usuario;
            } catch (error) {
                console.log(error);
            }
        }, 
        autenticarUsuario: async (_, {input}) => {

            const { email, password } = input;

            // Si el usuario existe
            const existeUsuario = await Usuario.findOne({email});
            if (!existeUsuario) {
                throw new Error('El usuario no existe');
            }

            // Revisar si el password es correcto
            const passwordCorrecto = await bcryptjs.compare( password, existeUsuario.password );
            if(!passwordCorrecto) {
                throw new Error('El Password es Incorrecto');
            }

            // Crear el token
            return {
                token: crearToken(existeUsuario, process.env.SECRETA, '8h' ) 
            }
            
        },
        nuevoTipo: async (_, {input}) => {
            try {
                const tipo = new Tipo(input);

                // almacenar en la bd
                const resultado = await tipo.save();

                return resultado;
            } catch (error) {
                console.log(error);
            }
        }, 
        actualizarTipo: async (_, {id, input}) => {
            // revisar si el producto existe o no
            let tipo = await Tipo.findById(id);

            if(!tipo) {
                throw new Error('Tipo de contrato no encontrado');
            }

            // guardarlo en la base de datos
            tipo = await Tipo.findOneAndUpdate({ _id : id }, input, { new: true } );

            return tipo;
        }, 
        eliminarTipo: async(_, {id}) => {
            // revisar si el producto existe o no
            let tipo = await Tipo.findById(id);

            if(!tipo) {
                throw new Error('Tipo de contrato no encontrado');
            }

            // Eliminar
            await Tipo.findOneAndDelete({_id :  id});

            return "Tipo de contrato Eliminado";
        },
        nuevoParte: async (_, { input }, ctx) => {

            console.log(ctx);
            console.log(input);
            
            const { EMAIL } = input
            // Verificar si el cliente ya esta registrado
            console.log(input);
            

            const parte = await Parte.findOne({ EMAIL });
            if(parte) {
                throw new Error('Ese email ya esta registrado');
            }

            const nuevoParte = new Parte(input);

            // asignar el vendedor
            nuevoParte.vendedor = ctx.usuario.id;

            // guardarlo en la base de datos

            try {
                const resultado = await nuevoParte.save();
                return resultado;
            } catch (error) {
                console.log(error);
            }
        },
        actualizarParte: async (_, {id, input}, ctx) => {
            // Verificar si existe o no
            let parte = await Parte.findById(id);

            if(!parte) {
                throw new Error('No existe');
            }

            // Verificar si el vendedor es quien edita
            if(parte.vendedor.toString() !== ctx.usuario.id ) {
                throw new Error('No tienes las credenciales');
            }

            // guardar el cliente
            parte = await Parte.findOneAndUpdate({_id : id}, input, {new: true} );
            return parte;
        },
        eliminarParte : async (_, {id}, ctx) => {
            // Verificar si existe o no
            let parte = await Parte.findById(id);

            if(!parte) {
                throw new Error('Ese cliente no existe');
            }

            // Verificar si el vendedor es quien edita
            if(parte.vendedor.toString() !== ctx.usuario.id ) {
                throw new Error('No tienes las credenciales');
            }

            // Eliminar Cliente
            await Parte.findOneAndDelete({_id : id});
            return "Eliminado"
        },
        nuevoContrato: async (_, {input}, ctx) => {
            console.log(ctx)
            const { parte1 } = input
            
            // Verificar si existe o no
            let parte1Existe = await Parte.findById(parte1);

            if(!parte1Existe) {
                throw new Error('No existe');
            }

            const { parte2 } = input
            
            // Verificar si existe o no
            let parte2Existe = await Parte.findById(parte2);

            if(!parte2Existe) {
                throw new Error('No existe');
            }



            // Verificar si el cliente es del vendedor
            if(parte2Existe.vendedor.toString() !== ctx.usuario.id ) {
                throw new Error('No tienes las credenciales');
            }

            // Revisar que el stock este disponible
            // for await ( const articulo of input.pedido ) {
            //     const { id } = articulo;

            //     const producto = await Producto.findById(id);

            //     if(articulo.cantidad > producto.existencia) {
            //         throw new Error(`El articulo: ${producto.nombre} excede la cantidad disponible`);
            //     } else {
            //         // Restar la cantidad a lo disponible
            //         producto.existencia = producto.existencia - articulo.cantidad;

            //         await producto.save();
            //     }
            // }

            // Crear un nuevo pedido
            const nuevoContrato = new Contrato(input);

            // asignarle un vendedor
            nuevoContrato.vendedor = ctx.usuario.id;

        
            //Guardarlo en la base de datos
            const resultado = await nuevoContrato.save();
            return resultado;

            
        },
        // actualizarPedido: async(_, {id, input}, ctx) => {

        //     const { cliente } = input;

        //     // Si el pedido existe
        //     const existePedido = await Pedido.findById(id);
        //     if(!existePedido) {
        //         throw new Error('El pedido no existe');
        //     }

        //     // Si el cliente existe
        //     const existeCliente = await Cliente.findById(cliente);
        //     if(!existeCliente) {
        //         throw new Error('El Cliente no existe');
        //     }

        //     // Si el cliente y pedido pertenece al vendedor
        //     if(existeCliente.vendedor.toString() !== ctx.usuario.id ) {
        //         throw new Error('No tienes las credenciales');
        //     }

        //     // Revisar el stock
        //     if( input.pedido ) {
        //         for await ( const articulo of input.pedido ) {
        //             const { id } = articulo;
    
        //             const producto = await Producto.findById(id);
    
        //             if(articulo.cantidad > producto.existencia) {
        //                 throw new Error(`El articulo: ${producto.nombre} excede la cantidad disponible`);
        //             } else {
        //                 // Restar la cantidad a lo disponible
        //                 producto.existencia = producto.existencia - articulo.cantidad;
    
        //                 await producto.save();
        //             }
        //         }
        //     }



        //     // Guardar el pedido
        //     const resultado = await Pedido.findOneAndUpdate({_id: id}, input, { new: true });
        //     return resultado;

        // },
        // eliminarPedido: async (_, {id}, ctx) => {
        //     // Verificar si el pedido existe o no
        //     const pedido = await Pedido.findById(id);
        //     if(!pedido) {
        //         throw new Error('El pedido no existe')
        //     }

        //     // verificar si el vendedor es quien lo borra
        //     if(pedido.vendedor.toString() !== ctx.usuario.id ) {
        //         throw new Error('No tienes las credenciales')
        //     }

        //     // eliminar de la base de datos
        //     await Pedido.findOneAndDelete({_id: id});
        //     return "Pedido Eliminado"
        // }
    }
}

module.exports = resolvers;