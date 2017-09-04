namespace StructureMonitor.Controllers

open System
open System.Collections.Generic
open System.Linq
open System.Threading.Tasks
open Microsoft.AspNetCore.Mvc
open System.IO
open System.Collections.Generic
open System.Linq

type Requery = {
    Path: string
}

type File() = 
    member val Name = "" with set,get
    member val FullName = "" with set,get

type Folder() = 
    member val Name = "" with set,get
    member val FullName = "" with set,get
    member val Folders = Enumerable.Empty<Folder>() with set,get
    member val Files = Enumerable.Empty<File>()  with set,get

type StructureController () =
    inherit Controller()

    let rec query (str: Folder) path = 
        let dir = DirectoryInfo path
        let dirs = 
            dir.GetDirectories() 
            |> Array.filter(fun x -> x.Name <> "node_modules")
            |> Array.filter(fun x -> x.Name <> "packages")
            |> Array.filter(fun x -> x.Name <> ".git")

        let files  = dir.GetFiles()

        str.Folders <- 
            [ for item in dirs do
                yield query (Folder()) item.FullName ]

        str.Name <- dir.Name
        str.FullName <- dir.FullName
        str.Files <- files.Select(fun x -> File(Name = x.Name, FullName = x.FullName) ).ToList()

        (str)

    [<HttpPost>]
    member this.GetStructures([<FromBody>] req: Requery) = 
        if Directory.Exists req.Path then
            let str = Folder()
            query str req.Path
        else
            Folder(Name="...")