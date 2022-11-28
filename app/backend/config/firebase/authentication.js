import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import jwt from 'jsonwebtoken';
import firebaseApp from './firebase.js';

const auth = getAuth(firebaseApp);

// Secret Key para el sistema de JWT
const secretKey = 'IngeneriadeSoftware2022-2S';

// Objeto para manejar la continuación cuando un
// usuario verifique su correo electrónico
// TODO: Cuando se este en ambiente de producción debe redirigir al 
// la pagina de inicio de la aplicación del frontend
const actionCodeSettings = {
    url: process.env.NODE_ENV === 'DEV' ? 'http://127.0.0.1:5173/' : 'https://app-quien-pa-leer.netlify.app/',
    handleCodeInApp: false
};

// Registro de usuario
export const registerUser = async (email, password) => {
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                // Mandar el correo de confirmacion
                const auth = getAuth();
                sendEmailVerification(auth.currentUser, actionCodeSettings)
                    .then(() => {
                        resolve(userCredential.user.uid);
                    })
                    .catch(() => {
                        throw { code: 'No se pudo mandar el correo de confirmación' }
                    });

            })
            .catch((error) => {
                const errorCode = error.code;

                // El mensaje de error por defecto es
                // el arrojado por Firebase ej:  auth/email-already-in-use
                let errorMessage = errorCode;


                // Se controla dos tipos de errores con mensajes personalizados: 
                // - Correo en uso
                // - Contraseña < 6 caracteres
                switch (errorCode) {
                    case 'auth/email-already-in-use':
                        errorMessage = `El correo electrónico ${email} ya se encuentra en uso`;
                        break;

                    case 'auth/weak-password':
                        errorMessage = `La contraseña debe de ser al menos de 6 carácteres`;
                        break;
                }

                reject(errorMessage);

            });
    }
    );
};


// Login de usuario
export const loginUser = async (email, password) => {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Logueado
                const user = userCredential.user;
                // Verificar que el usuario ya confirmó su correo electrónico
                if (user.emailVerified || process.env.NODE_ENV === 'DEV') {
                    resolve(user.uid);
                } else {
                    throw { code: `El correo ${user.email} no se encuentra confirmado. Por favor revise su correo` }
                }
            })
            .catch((error) => {
                const errorCode = error.code;

                // El mensaje de error por defecto es
                // el arrojado por Firebase ej:  auth/email-already-in-use 
                let errorMessage = errorCode;

                // Se controla dos tipos de errores con mensajes personalizados: 
                // - No existe una cuenta con el correo especificado
                // - La contraseña no es correcta
                switch (errorCode) {
                    case 'auth/user-not-found':
                        errorMessage = `El correo ${email} NO se encuentra registrado`;
                        break;
                    case 'auth/wrong-password':
                        errorMessage = `La contraseña es incorrecta`;
                        break;
                }
                reject(errorMessage);
            });
    });
};



// Manejo de persistencia a través de JWT tokens 

// Middleware para verificar que el usuario tiene el cookie con el token
// y agrega el id de este usuario al objeto req
export const isUserAuthenticaded = (req, res, next) => {


    const token = req.cookies.access_token;

    // Si no se encuentra el token en los cookies
    // Se retorna el error 401
    if (!token) {
        return res.sendStatus(401);
    }

    try {

        // Decodificar el jwt
        const data = jwt.verify(token, secretKey);

        // Asignar al objeto req el id del usuario a partir del cookie
        req.userId = data._id;

        return next();


    } catch {
        // Error al decodificar el jwt pasado mediante la cookie
        return res.sendStatus(401);
    }
};


// Metodo para generar Tokens basados en los usuarios
// En la generación del token solamente quedará encriptado el id del usuario
export const getToken = (userId) => {
    return jwt.sign(
        { _id: userId },
        secretKey,
        {
            // El token tiene un tiempo de vida util de 2 dias
            expiresIn: '48h'
        }
    );
};