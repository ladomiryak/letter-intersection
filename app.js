import paper from "paper/dist/paper-core";
import gsap, { Power1 } from "gsap";

paper.install(window);

window.onload = function () {
  const canvas = document.getElementById("myCanvas");
  const img = document.getElementById("img");
  const overlay = document.getElementById("overlay");
  paper.setup(canvas);

  const shape2 = new CompoundPath(
    'M75.5735846,215.25734 L75.5735846,0 L0,0 L0,702 L75.5735846,702 L75.5735846,335.320349 C83.5394547,317.255679 96.5645586,308.223344 114.648896,308.223344 C138.400522,311.710339 144.930565,326.814325 144.930565,346.842809 C144.930565,360.195133 146.268618,478.580863 148.944726,702 L336.459285,702 C341.074223,499.67959 339.402254,360.609467 331.443378,284.789631 C326.946783,248.895599 318.177981,170.666084 223.994779,137.731431 C162.807781,124.852632 113.33405,150.694602 75.5735846,215.25734 Z'
  );

  const shape1 = new CompoundPath(
    'M371.895333,133.150738 C516.631778,152.468364 589,232.044719 589,371.879803 L245.002701,371.879803 C239.698905,482.62599 288.387353,551.488914 391.068046,578.468577 C441.352227,586.74194 491.285592,581.282006 540.868142,562.088775 L589,537.999083 C575.919198,576.823422 557.101574,610.173558 532.547129,638.04949 C508.948309,664.84053 479.612667,686.157367 444.540203,702 L220.158698,702 C98.7195662,639.576926 38,546.479675 38,422.708247 C43.7576047,234.77694 245.002701,113.122817 371.895333,133.150738 Z M336.598698,144.486059 C275.630414,144.486059 245.616394,220.890623 245.01186,355.780349 L245.002701,359.887647 L417.00135,359.887647 C423.235576,216.286589 396.434692,144.486059 336.598698,144.486059 Z');

  let inter;
  let letterColor = '#221e20';
  let letterIntersectColor = '#fff';
  let letters = new Group(shape2, shape1);

  letters.fillColor = letterColor;

  letters.fitBounds(view.bounds);

  letters.position.x -= Math.abs((letters.bounds.width - view.bounds.width) / 2);

  function showIntersections(path1, path2) {
    inter = path2.intersect(path1);
    inter.fillColor = letterIntersectColor;
  }

  function animate() {
    let shape1PosX = shape1.position.x;
    let shape2PosX = shape2.position.x;

    gsap.to([shape1, shape2, inter], { opacity: 0, duration: 0 });
    gsap.to(img, { opacity: 0, duration: 0 });

    gsap.fromTo(overlay, {
      bottom: '100%',
      duration: 0.4,
      ease: Power1.easeOut,
    },
      {
        bottom: 0,
        duration: 0.3,
        ease: Power1.easeIn,
      }).eventCallback('onComplete', () => {

        gsap.to(overlay, {
          top: '100%',
          duration: 0.5,
          ease: Power1.easeIn,
        }).eventCallback('onComplete', () => {
          gsap.set(overlay, { top: 'auto', bottom: '100%', });
        });;

        gsap.to(img, { opacity: 1, duration: 0 });
        gsap.to([shape1, shape2, inter], { opacity: 1, duration: 0 });

        gsap.fromTo(
          shape1.position,
          {
            x: shape1PosX + 200,
          },
          {
            x: shape1PosX,
            duration: 1.5,
            ease: Power1.easeOut,
          }
        );

        gsap.fromTo(
          shape2.position,
          {
            x: shape2PosX + 400,
          },
          {
            x: shape2PosX,
            duration: 1.5,
            ease: Power1.easeOut,
          }
        );

        gsap.from(img, {
          scale: 1.3,
          duration: 1.8,
          ease: Power1.easeOut,
        });
      })
  }

  animate();

  view.onFrame = function (event) {
    if (inter) {
      inter.remove();
    }

    showIntersections(shape1, shape2);
  };

  view.draw();
};
