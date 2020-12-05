set -e

rm -rf dist

cd example
rm -rf dist
yarn build
cp -r dist ..
cd ..

cd iframe
rm -rf dist
yarn build
cp -r dist ../dist/iframe
cd ..

cd js
rm -rf dist
yarn build
cp -r dist ../dist/js
cd ..

cd dist
mv index.prd.html index.html
cd ..

surge -d https://panvala-example.surge.sh -p dist
