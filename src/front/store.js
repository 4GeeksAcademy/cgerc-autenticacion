export const initialStore = () => {
  return {
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      },
    ],
    token: null,           // Almacena el token JWT
    userEmail: null,       // Almacena el email del usuario autenticado
    isAuthenticated: false, // Indica si el usuario está autenticado
    error: null,           // Maneja mensajes de error
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'set_hello':
      return {
        ...store,
        message: action.payload,
      };

    case 'add_task':
      const { id, color } = action.payload;
      return {
        ...store,
        todos: store.todos.map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo
        ),
      };

    case 'login':
      return {
        ...store,
        token: action.payload.token,
        userEmail: action.payload.email,
        isAuthenticated: true,
        error: null,
      };

    case 'signup':
      return {
        ...store,
        userEmail: action.payload.email,
        isAuthenticated: false, // El usuario se registra pero aún debe iniciar sesión
        error: null,
      };

    case 'logout':
      return {
        ...store,
        token: null,
        userEmail: null,
        isAuthenticated: false,
        error: null,
      };

    case 'set_error':
      return {
        ...store,
        error: action.payload,
      };

    default:
      throw Error('Unknown action.');
  }
}