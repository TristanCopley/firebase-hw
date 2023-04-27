import { database  } from '../firebase';
import { getDoc, doc } from 'firebase/firestore';

export async function load() {

    const db = database();

    const docSnap = await getDoc(doc(db, 'settings/settings'));
	const settings = docSnap.data() as {settings: {name: string, value: string}[]} | null;

    return settings;

}