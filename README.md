# hxdrcontainer

A docker sample of a hxdr container

## To build
```
docker build -t hxdr/sample:1.0 .
```

## To use

1) Place the input files in the input volume
2) Create a configuration file in json formar and place it in the inputs volume
2) Execute the docker
3) Take the output files from the output folder


## Current assimp version
Version 5.0

### Supported input formats
*.3d, *.3ds, *.3mf, *.ac, *.ac3d, *.acc, *.amf, *.ase, *.ask, *.assbin, *.b3d, *.blend, *.bvh, *.cob, *.csm, *.dae, *.dxf, *.enff, *.fbx, *.glb, *.gltf, *.hmp, *.ifc, *.ifczip, *.irr, *.irrmesh, *.lwo, *.lws, *.lxo, *.md2, *.md3, *.md5anim, *.md5camera, *.md5mesh, *.mdc, *.mdl, *.mesh, *.mesh.xml, *.mot, *.ms3d, *.ndo, *.nff, *.obj, *.off, *.ogex, *.pk3, *.ply, *.pmx, *.prj, *.q3o, *.q3s, *.raw, *.scn, *.sib, *.smd, *.stl, *.stp, *.ter, *.uc, *.vta, *.x, *.x3d, *.x3db, *.xgl, *.xml, *.zae, *.zgl

### Supported export formats
collada, x, stp, obj, objnomtl, stl, stlb, ply, plyb, 3ds, gltf2, glb2, gltf, glb, assbin, assxml, x3d, fbx, fbxa, 3mf, assjson

### Internal export options
```sh
assimp export <model> [<out>] [-f<h>] [common parameters]
         -f<h> Specify the file format. If omitted, the output format is
                derived from the file extension of the given output file
        [See the assimp_cmd docs for a full list of all common parameters]
```

### Configuration file
The configuration file must have the following structure
```json
{
  "source": "Grethes-hus-bok-2.ifc",
  "target": "Grethes-hus-bok-2.obj"
}
```

# Execution command
## Run production
```sh
docker run --rm --user hxdr:hxdr -v C:\volumes\input:/home/hxdr/input -v C:\volumes\output:/home/hxdr/output -v C:\volumes\logs:/home/hxdr/logs --memory="1g" hxdr/sample:1.0  
```

## Run debug with interactive console
```sh
docker run -it --rm --user hxdr:hxdr -v C:\volumes\input:/home/hxdr/input -v C:\volumes\output:/home/hxdr/output -v C:\volumes\logs:/home/hxdr/logs --memory="1g" hxdr/sample:1.0 /bin/bash 
```