# IBM Garage
## Developer Tools Dashboard

A simple dashboard that enables navigation to the tools have been installed using the `iteration-zero` Terraform asset.

## Build

To build the project use the following commands.

Build and develop with the server code it will open on port `3000`
```bash
npm install
npm run build
npm run start
```

Build and develop with the client code it will open on port `3001`
```bash
cd client
npm run dev 

```

### Testing API

Use PostMan `newman` CLI
```bash
brew install newman
npm run api:test
```

### Release steps

The following steps enable you to release a new version of the Dashboard into Docker hub so it can be installed using Terraform.

#### Step 1 

Release version of the code
```
git add .
git commit -m "Update"
git push
git tag v1.0.x
git push --tags
```

#### Step 2

Go to [Garage Terraform modules](https://github.com/ibm-garage-cloud/garage-terraform-modules)

Edit this file

```
https://github.com/ibm-garage-cloud/garage-terraform-modules/blob/master/tools/catalystdashboard_release/variables.tf
```

Change the default value to the current tagged version that is being built

```json
variable "image_tag" {
  description = "The image version tag to use"
  default     = "1.0.x"
}
```

Tag the versions of the Terraform Modules

```bash
git add .
git commit -m "Update version"
git push
git tag v1.0.x
git push --tags
```

#### Step 3

Go to Iteration zero to update the versions of the modules

```json
https://github.com/ibm-garage-cloud/ibm-garage-iteration-zero
```

Edit and increment the version of the module to the Terraform modules tagged version 
```
https://github.com/ibm-garage-cloud/ibm-garage-iteration-zero/blob/master/terraform/stages/stage2-catalystdashboard.tf```




