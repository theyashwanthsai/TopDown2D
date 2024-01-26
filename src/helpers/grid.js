export const gridCells = n => {
    return n*16; 
}

export const isSpaceFree = (walls, x, y) => {

    const str = `${x},${y}`;
    const isPresent = walls.has(str);
    return !isPresent;
}