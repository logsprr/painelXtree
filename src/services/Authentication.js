import firebase from 'firebase';
const Authentication = async () => {
    const token = localStorage.getItem('TOKEN');
    try {
        const req = await firebase.firestore().collection('users').doc(token).get();
        if (req.exists) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
}

export default Authentication;