## Structure Monitor

![](images/screen.png)

## Development

```bash
# build backend
dotnet build Backend/StructureMonitor/StructureMonitor.fsproj
dotnet run --project Backend/StructureMonitor/StructureMonitor.fsproj

# build frontend
webpack
webpack -p

# prepack
prepack dist/main.js
prepack dist/render.js

# watch mode
d-project backend/StructureMonitor/StructureMonitor.fsproj
dotnet watch run

# create release
dotnet publish -c release -r osx.10.12-x64 -o ../../dist/backend /p:LinkDuringPublish=false backend/StructureMonitor

# create package
npm run mac-package
npm run mac-dmg

# prune
yarn install --production --ignore-scripts --prefer-offline
npm prune --production
```