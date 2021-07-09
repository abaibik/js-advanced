const textBefore =
  "'Lorem ipsum', aren't don't dolor sit 'amet consectetur' adipisicing elit. In doloremque sit reiciendis, eius officia impedit, numquam maxime voluptatum quo atque dolorum voluptatem nobis sed mollitia laboriosam sint ipsam voluptates quaerat.";

// const textAfter = textBefore.replace(/'/g, '"');
const textAfter = textBefore.replace(/\B'/g, '"').replace(/'\B/g, '"');
