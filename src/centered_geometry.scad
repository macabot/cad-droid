
module ccube(size, center=[1,1,1]) {
    trans = [
        size[0] * center[0] / 2,
        size[1] * center[1] / 2,
        size[2] * center[2] / 2,
    ];
    translate(trans) cube(size, true);
}
