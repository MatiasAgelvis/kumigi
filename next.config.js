if (
  process.env.LD_LIBRARY_PATH == null ||
  !process.env.LD_LIBRARY_PATH.includes(
    `${process.env.PWD}/node_modules/canvas/build/Release:`,
  )
) {
  process.env.LD_LIBRARY_PATH = `${
    process.env.PWD
  }/node_modules/canvas/build/Release:${process.env.LD_LIBRARY_PATH || ''}`;
}

// next.config.js

module.exports = {
  // No need for next/babel unless specific transformations are needed
  // experimental: {
  //   appDir: true, // For custom directory structure (optional)
  // },
};
