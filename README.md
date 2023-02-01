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