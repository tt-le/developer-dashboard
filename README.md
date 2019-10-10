# IBM Garage for Cloud Developer Tools Dashboard

A simple dashboard that enable navigation to the tools have have been installed using the `iteration-zero` Terraform asset.

## Build

To build the project use the following commands.

```bash
npm install
npm run build
npm run start

cd client
npm run dev 

```

### Release steps

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
https://github.ibm.com/garage-catalyst/iteration-zero-ibmcloud
```

Edit and increment the version of the module to the Terraform modules tagged version 
```
https://github.ibm.com/garage-catalyst/iteration-zero-ibmcloud/blob/master/terraform/stages/stage2-catalystdashboard.tf
```




