set -e

rm -rf dist

cd example
rm -rf dist
yarn build
source .env.production
export a=http://localhost:3401/script.js
export b=$JS_HOST/script.js
sed -i '' -- "s#$a#$b#g" dist/index.html
cp src/shot.png dist
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

surge -d https://panvala-example.surge.sh -p dist
