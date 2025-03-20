---
title: "google: error getting credentials using GOOGLE_APPLICATION_CREDENTIALS environment variable: open ~/root/project-123456-a1b2c3d4e5f6.json: no such file or directory"
date: 2025-02-03 17:00:00  +0530
categories:
  - Shell
  - Error
tags:
  - terraform
  - google
  - google-cloud
  - auth
  - error
  - resolve
---
# Resolving Terraform Authentication Error with Google Cloud

## Error Description
When running `terraform plan`, you may encounter the following error:

```
Error: Attempted to load application default credentials since neither `credentials` nor `access_token` was set in the provider block. No credentials loaded. To use your gcloud credentials, run 'gcloud auth application-default login'.

Original error: google: error getting credentials using GOOGLE_APPLICATION_CREDENTIALS environment variable: open ~/root/project-123456-a1b2c3d4e5f6.json: no such file or directory
```

This error occurs because Terraform is unable to locate the Google Cloud authentication file specified in the `GOOGLE_APPLICATION_CREDENTIALS` environment variable.

## Steps to Resolve the Error

### 1. **Verify the File Path**
Terraform is looking for `~/root/project-123456-a1b2c3d4e5f6.json`, but the path is incorrect. The `~` symbol refers to your home directory, which is likely `/home/<your-username>/`, not `/root/`.

#### **Solution:** Move the file to a proper location
Run the following commands:
```bash
mkdir -p ~/gcp-creds
mv ~/root/project-123456-a1b2c3d4e5f6.json ~/gcp-creds/
```

### 2. **Update the Environment Variable**
Once the file is in a proper location, update the `GOOGLE_APPLICATION_CREDENTIALS` variable:
```bash
export GOOGLE_APPLICATION_CREDENTIALS="$HOME/gcp-creds/my-service-account.json"
```
To make this change permanent, add it to your `~/.bashrc` file:
```bash
echo 'export GOOGLE_APPLICATION_CREDENTIALS="$HOME/gcp-creds/my-service-account.json"' >> ~/.bashrc
source ~/.bashrc
```

### 3. **Verify the File Exists**
Run the following command to ensure the file is correctly placed:
```bash
ls -l $GOOGLE_APPLICATION_CREDENTIALS
```
If the file does not exist, locate it and update the variable accordingly.

### 4. **Ensure Correct File Permissions**
Terraform may not have the necessary permissions to access the credentials file. Fix this by running:
```bash
chmod 600 $GOOGLE_APPLICATION_CREDENTIALS
```

### 5. **Authenticate with `gcloud` (Optional)**
If you're using Google Cloud CLI, authenticate with:
```bash
gcloud auth application-default login
```
This will generate default credentials that Terraform can use.

### 6. **Ignore Credential Files in Git**
To prevent accidental commits of sensitive credentials, add the following line to your `.gitignore` file:
```bash
*.json
```
This ensures that any JSON credentials files are ignored by Git and not uploaded to GitHub.

### 7. **Retry Running Terraform**
Once the above steps are completed, try running Terraform again:
```bash
terraform plan
```

## Summary of Fixes
| Issue                        | Solution                                                                    |
| ---------------------------- | --------------------------------------------------------------------------- |
| Incorrect file path          | Move credentials file to `~/gcp-creds/` and update the environment variable |
| Missing environment variable | Set `GOOGLE_APPLICATION_CREDENTIALS` and add it to `~/.bashrc`              |
| Missing file                 | Verify file existence using `ls -l`                                         |
| Permission issues            | Set correct permissions using `chmod 600`                                   |
| Authentication issues        | Run `gcloud auth application-default login`                                 |
| Security concerns            | Add `*.json` to `.gitignore` to prevent accidental commits                  |

Following these steps should resolve the authentication issue and allow Terraform to access Google Cloud credentials successfully.

