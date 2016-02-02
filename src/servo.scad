use <centered_geometry.scad>;

module servo(size, gear_size, gear_pos=[0,0]) {
    cube(size, true);
    height = (gear_size[2] + size[2]) / 2;
    translate(concat(gear_pos,[height])) {
        cube(gear_size, true);
    }
}

module servo_holder(
    servo,
    thickness,
    base_height,
    corner_width,
    center
) {
    servo_diff = [
        servo[0],
        servo[1],
        servo[2]*2
    ];
    holder = [
        servo[0] + thickness[0]*2,
        servo[1] + thickness[1]*2,
        servo[2] + thickness[2]*2    
    ];
    echo("holder: ", holder);
    xdiff = [
        holder[0] * 2,
        holder[1] - 2*corner_width,
        holder[2]
    ];
    echo("xdiff: ", xdiff);
    ydiff = [
        holder[0] - 2*corner_width,
        holder[1] * 2,
        holder[2]
    ];
    echo("ydiff: ", ydiff);
    echo("servo_diff: ", servo_diff);
    difference() {
        ccube(holder, [0,0,1]);
        translate([0,0,thickness[2]]) {
            ccube(servo_diff, [0,0,1]);
            translate([0,0,base_height]) {
                ccube(xdiff, [0,0,1]);
                ccube(ydiff, [0,0,1]);
            }
        }
    }
}

