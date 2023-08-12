# smtp-to-json-converter
SMTP Email to JSON converter

### Prerequisite
* Node.js version > 18.0

### Setup
1. Clone the git repo
```shell
git clone https://github.com/DevOpt/smtp-to-json-converter.git
```
2. Go to the directory
```shell
cd smtp-to-json-converter
```
3. Run the smtp-server
```shell
node server.js
```
If you want to export the `json` data to a file add `--save` or `-s` flag 
and the file gets stored on disk.
```shell
node server.js -s
```
4. Send an email using smtp client or any CLI command. 
The server is listening on port `587`
```shell
node client.js
```
#### Sample JSON payload:
```json
{
  "id": "qaihvtfu2lgp6cfc",
  "attachments": [],
  "text": "This is the body of the email.\n",
  "html": false,
  "to": [
    {
      "address": "jane.doe@example.com",
      "name": "Jane Doe"
    }
  ],
  "from": [
    {
      "address": "jsmith@example.com",
      "name": "John Smith"
    }
  ]
}
```
### Next
> Will be adding more features such as cc & bc fields and API support in the future.
