const { gql } = require("apollo-server");

// Schema
const typeDefs = gql`
  type Usuario {
    id: ID
    nombre: String
    apellido: String
    email: String
    creado: String
  }

  type Token {
    token: String
  }

  type Tipo {
       id: ID
       nombre: String
       encalidadde1: String
       encalidadde1f: String
       encalidadde2: String
       encalidadde2f: String
       encalidadde3: String
       encalidadde3f: String
   }

  type Parte {
      id: ID
      CLAVE: String
      NOMBRE: String
      AP_PAT_: String
      AP_MAT_: String
      R_F_C_: String
      IMSS: String
      DEPTO: String
      EMAIL: String
      CURP: String
      vendedor: ID
  }

  # type Pedido {
  #     id: ID
  #     pedido: [PedidoGrupo]
  #     total: Float
  #     cliente: Cliente
  #     vendedor: ID
  #     fecha: String
  #     estado: EstadoPedido
  # }

  # type PedidoGrupo{
  #     id: ID
  #     cantidad: Int
  #     nombre: String
  #     precio: Float
  # }

  # type TopCliente {
  #     total: Float
  #     cliente: [Cliente]
  # }

  # type TopVendedor {
  #     total: Float
  #     vendedor: [Usuario]
  # }

  input UsuarioInput {
    nombre: String!
    apellido: String!
    email: String!
    password: String!
  }

  input AutenticarInput {
    email: String!
    password: String!
  }

  input TipoInput {
    nombre: String!
    encalidadde1: String!
    encalidadde1f: String!
    encalidadde2: String!
    encalidadde2f: String!
  }

  input ParteInput {
      CLAVE: String!
      NOMBRE: String!
      AP_PAT_: String!
      AP_MAT_: String!
      R_F_C_: String!
      IMSS: String!
      DEPTO: String!
      EMAIL: String!
      CURP: String!
  }

  # input PedidoProductoInput {
  #     id: ID
  #     cantidad: Int
  #     nombre: String
  #     precio: Float
  # }

  # input PedidoInput {
  #     pedido: [PedidoProductoInput]
  #     total: Float
  #     cliente: ID
  #     estado: EstadoPedido
  # }

  # enum EstadoPedido {
  #     PENDIENTE
  #     COMPLETADO
  #     CANCELADO
  # }

  type Query {
    #Usuarios
    obtenerUsuario: Usuario

    # Tipos
    obtenerTipos: [Tipo]
    obtenerTipo(id: ID!): Tipo

    #Clientes
    obtenerPartes: [Parte]
    obtenerPartesVendedor: [Parte]
    obtenerParte(id: ID!): Parte

    #     # Pedidos
    #     obtenerPedidos: [Pedido]
    #     obtenerPedidosVendedor: [Pedido]
    #     obtenerPedido(id: ID!) : Pedido
    #     obtenerPedidosEstado(estado: String!): [Pedido]

    #     # Busquedas Avanzadas
    #     mejoresClientes: [TopCliente]
    #     mejoresVendedores: [TopVendedor]
    #     buscarProducto(texto: String!) : [Producto]
  }

  type Mutation {
    # Usuarios
    nuevoUsuario(input: UsuarioInput): Usuario
    autenticarUsuario(input: AutenticarInput): Token

    # Tipos
    nuevoTipo(input: TipoInput): Tipo
    actualizarTipo( id: ID!, input : TipoInput ) : Tipo
    eliminarTipo( id: ID! ) : String

    # Clientes
    nuevoParte(input: ParteInput) : Parte
    actualizarParte(id: ID!, input: ParteInput): Parte
    eliminarParte(id: ID!) : String

    # # Pedidos
    # nuevoPedido(input: PedidoInput): Pedido
    # actualizarPedido(id: ID!, input: PedidoInput ) : Pedido
    # eliminarPedido(id: ID!) : String
  }
`;

module.exports = typeDefs;
