import  app from '../firebase/app.js';
import { getFirestore } from 'firebase-admin/firestore';

const db = getFirestore(app);
const usersCollection = db.collection('usuarios');

async function findAll() {
    const usersSnapshot = await usersCollection.get();
    const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));
    return users;
}

async function  findById(id) {
    const userSnapshot = await usersCollection.doc(id).get();

    if(userSnapshot.exists){
        const user = { id: userSnapshot.id, ...userSnapshot.data() }
        return user;
    } else {
        return null;
    }
}

async function save(user) {
    await usersCollection.add(user);
}

async function update(id, user) {
    const userRef = usersCollection.doc(id);
    const userSnapshot = await userRef.get();

    if (userSnapshot.exists) {
        const updatedUser = await userRef.update(user);
        return true;
    } else {
        return false;
    }
}

async function remove(id) {
    const userSnapshot = await usersCollection.doc(id).get();

    if(userSnapshot.exists) {
        await usersCollection.doc(id).delete();
        return true;
    } else {
        return false;
    }
}

export {
    findAll,
    findById,
    save,
    update,
    remove
}