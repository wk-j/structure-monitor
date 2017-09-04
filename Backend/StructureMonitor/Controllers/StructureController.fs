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

type Folder() = 
    member val Name = "" with set,get
    member val Folders = Enumerable.Empty<Folder>() with set,get
    member val Files = Enumerable.Empty<string>()  with set,get

type StructureController () =
    inherit Controller()

    let rec query (str: Folder) path = 

        Console.WriteLine(path : string)

        let dir = DirectoryInfo path
        let dirs = dir.GetDirectories()
        let files  = dir.GetFiles()

        str.Folders <- 
            [ for item in dirs do
                yield query (Folder()) item.FullName ]

        str.Name <- dir.Name
        str.Files <- files.Select(fun x -> x.Name).ToList()

        (str)

    [<HttpPost>]
    member this.GetStructures([<FromBody>] req: Requery) = 
        let str = Folder()
        query str req.Path