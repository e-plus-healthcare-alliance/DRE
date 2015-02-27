# DRE Release Notes

# v1.3.0 - December 12, 2014

This release of the DRE includes:

- HL7 Labs ingestion via MLLP
- Patient Identification and Matching (for HL7 data)
- Update to use refactored Blue Button libraries


# v1.2.0 - September 15, 2014

This release of the DRE includes:

- VA Blue Button (C32) file support
- CDA file support
- Improved CCDA file generation
- Improved sensing of file formats of uploaded files
- Uses blue-button.js v1.2.0 JSON data model and parser
- Uses blue-button-match.js v1.2.0 matching engine
- Uses blue-button-record.js library v1.1.0


# v1.1.0 - September 2, 2014

The second release of the DRE includes:

- CMS file support
- CCDA file generation
- Improved many-to-many matching
- Login and Authorization added
- Uses blue-button.js v1.1.0 JSON data model and parser
- Uses blue-button-match.js v1.1.0 matching engine
- Uses blue-button-record.js library v1.1.0
	- Currently supports MongoDB persistence
- Sample Blue Button data for 4 demo scenarios (at ./server/test/artifacts/demo-r1.2)

# v1.0.0 - May 31, 2014 (Raccoon)

This is the initial release of the DRE.

- Uses blue-button.js v1.0.0 JSON data model and parser
- Uses blue-button-match.js v1.0.0 matching engine
- Uses blue-button-record.js library (embedded into this repo)
	- Currently supports MongoDB persistence
- Sample Blue Button data for 4 scenarios (at ./server/test/artifacts/demo-r1.0)
- Demo UI to demonstrate use of Data Reconciliation Engine libraries
- Further integration required for production use
	- e.g. Identity Management solution to track patient IDs
- Records are uploaded from web UI
	- Integration with DIRECT is possible



