## Structure Monitor

![](images/screen.png)

## Development

```bash
dotnet build Backend/StructureMonitor/StructureMonitor.fsproj
dotnet run --project Backend/StructureMonitor/StructureMonitor.fsproj

# watch mode
d-project backend/StructureMonitor/StructureMonitor.fsproj
dotnet watch run

# create release
dotnet publish -c release -r osx.10.12-x64 -o ../../dist/backend /p:LinkDuringPublish=false backend/StructureMonitor

# prunce
yarn install --production --ignore-scripts --prefer-offline

npm run mac-package
npm run mac-dmg

# prune
npm prune --production
yarn run mac-package
```