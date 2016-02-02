use <servo.scad>;
use <centered_geometry.scad>;

//translate([10, 0, 0]) ccube([10, 10, 10], [0, 0, 1]);

servo = [40, 30, 20];
color("red") servo_holder(
    servo,
    [2, 2, 2],
    5,
    5,
    0
);

color("green") rotate([0,0,0]) servo(servo, [5,5,3]);

