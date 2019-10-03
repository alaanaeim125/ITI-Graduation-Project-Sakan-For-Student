export class Owner {
    constructor(
        // tslint:disable-next-line: variable-name
        public fullName?: string,
        public password?: string,
        public phone?: string,
        public email?: string,
        public imgUrlOwner?: string,
        public status?: boolean,
        public _id?: string,
        public postsOfOwner?:string []

    ) { }
}
