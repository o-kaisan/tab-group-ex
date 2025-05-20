# Tab Group Ex

**Easily manage, group, and save your Chrome tabs.**
Tab Group Ex helps you organize your tabs into groups with a single click. Group by domain, custom rules, or all at once. You can also save, restore, and manage tab groups effortlessly.

![](./demo/tab-group-ex_demo.gif)

## Features

- **Group tabs together**
  - **Group ungrouped tabs:** 
      - Group all ungrouped tabs into a new group.  
  - **Group by Domain:** 
      - Groups tabs by domain
  - **Group by Custom Domain:** 
      - Groups tabs by user-defined domains (ignores subdomains)
- **Ungroup all tabs**  
- **Display a list of groups**
  - View all tab groups in the current window
  - Click a group name to show the list of page names
  - Right-click a group name to toggle it open or closed
  - Click the group settings icon to:
    - Close the group
    - Ungroup the group
- **Save tab groups**
- **Display a list of saved tab groups**
  - Click a group name to view its page names
  - Restore entire groups or individual pages
  - Press the star icon to add a tab group to favorites
- **Restore favorite tab groups**
  - Restore all tab groups marked as favorites at once  

## Custom Domain

To group tabs by custom domains, go to the "Rules" tab and add your domains.

**Example:**  
`https://chrome.google.com/` → `google`  
`https://www.google.com/` → `google`

**Note:**

- After editing the rules, click **SAVE RULES** to apply changes.
- Subdomains are ignored and treated as part of the main domain.

## Shortcut keys

| Feature                            | Shortcut Key         |
|------------------------------------|-----------------------|
| Open extension                     | Ctrl + Shift + Z      |
| Group all ungrouped tabs           | Ctrl + Shift + A      |
| Group tabs by domain               | Not set by default    |
| Group tabs by custom domain        | Not set by default    |
| Ungroup all tabs                   | Not set by default    |
| Save current tab groups                    | Ctrl + Shift + S      |
| Restore favorite tab groups        | Ctrl + Shift + R      |

---

## Recently Updated

### v3.3.0

Latest updates and improvements in version 3.3.0:

- **[Changed]** Replaced the Settings tab with a new Actions tab  
  - Removed the concept of "mode" and enabled users to freely choose any action  
  - Renamed the Settings tab to the Actions tab to provide access to all available features  
  - Displayed shortcut keys for each action in the Actions tab  
  - Added an option to enable or disable notifications (snackbars) when actions are performed  
- **[New]** Added a favorites feature for saved tab groups  
  - Favorite tab groups can now be restored all at once using the restore feature  

### v3.2.0

Latest updates and improvements in version 3.2.0:

- **[New]** Added a shortcut key to save the current tab group
- **[Improved]** Separated the delete icons for tab groups and individual tabs to reduce confusion
- **[Fixed]** Fixed an issue where clicking the delete button for a tab inside a group would close the extension window
- **[Removed]** Removed the default shortcut for the Custom Domain grouping mode