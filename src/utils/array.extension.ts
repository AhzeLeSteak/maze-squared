interface Array<T>{
    chunk(chunkSize: number): T[][];
}

Array.prototype.chunk = function ( chunkSize){
    const chunks = [];
    for (let i = 0; i < this.length; i += chunkSize) {
        chunks.push(this.slice(i, i + chunkSize));
    }
    return chunks;
}