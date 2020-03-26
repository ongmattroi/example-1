/** @format */

// const nextConfig = {
//   webpack: (config, { dev, isServer }) => {
//     if (!isServer) {
//       config.node = {
//         fs: "empty",
//         net: "empty"
//       };
//     }
//     config.module.rules.push(
//       {
//         test: /\.(css|scss)/,
//         loader: "emit-file-loader",
//         options: {
//           name: "dist/[path][name].[ext]"
//         }
//       },
//       {
//         test: /\.css$/,
//         loader: "babel-loader!raw-loader"
//       },
//       {
//         test: /\.scss$/,
//         loader: "babel-loader!raw-loader!sass-loader"
//       }
//     );
//     return config;
//   }
// };

module.exports = {
  webpack: (config, { dev, isServer }) => {
    if (!isServer) {
      config.node = {
        fs: "empty",
        net: "empty"
      };
    }
    config.module.rules.push(
      {
        test: /\.(css|scss)/,
        loader: "emit-file-loader",
        options: {
          name: "dist/[path][name].[ext]"
        }
      },
      {
        test: /\.css$/,
        loader: "babel-loader!raw-loader"
      },
      {
        test: /\.scss$/,
        loader: "babel-loader!raw-loader!sass-loader"
      }
    );
    return config;
  }
};
