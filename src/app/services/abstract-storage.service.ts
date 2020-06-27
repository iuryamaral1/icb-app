import * as firebase from 'firebase';

export class AbstractStorageService {

    private storageRef: firebase.storage.Reference = firebase.storage().ref();

    constructor() {  }

    listarArquivos(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.storageRef.listAll()
                .then(res => resolve(res))
                .catch(res => reject(res));
        });
    }
}
