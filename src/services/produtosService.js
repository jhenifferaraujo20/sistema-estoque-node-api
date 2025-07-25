import app from "../firebase/app.js";
import { getFirestore } from "firebase-admin/firestore";

const db = getFirestore(app);
const productsCollection = db.collection("produtos")

async function findAll() {
    const productsCollectionSnapshot = await productsCollection.get();
    const products = [];
    productsCollectionSnapshot.forEach(doc => {
        const item = { id: doc.id, ...doc.data()};
        products.push(item);
    });
    return products;
}

async function findById(id) {
    const productDocSnapshot = await productsCollection.doc(id).get();

    if (productDocSnapshot.exists) {
        const product = { ...productDocSnapshot.data(), id: productDocSnapshot.id };
        return product;
    } else {
        return null;
    }
}

async function save(newProductData) {
    await productsCollection.add(newProductData);
}

async function update(id, updatedProductData) {
    const productDocRef = productsCollection.doc(id);
    const productDocSnapshot = await productDocRef.get();

    if (productDocSnapshot.exists) {
        await productDocRef.update(updatedProductData);
        return true;
    } else {
        return false;
    }
}

async function remove(id) {
    const productDocRef = productsCollection.doc(id);
    const productDocSnapshot = await productDocRef.get();

    if(productDocSnapshot){
        await productDocRef.delete();
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
};