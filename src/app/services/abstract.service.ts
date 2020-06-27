import * as firebase from 'firebase';

export class AbstractService {

    private pathRef: string;

    constructor(private ref: string) {
        this.pathRef = ref;
    }

    private database = firebase.database();

    findAll(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.database.ref(this.pathRef)
                .once('value')
                .then(res => resolve(res))
                .catch(res => reject(res));
        });
    }

    getLastEntity(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.database.ref(this.pathRef)
                .limitToLast(1)
                .on('value', res => resolve(res), err => reject(err));
        });
    }
}
