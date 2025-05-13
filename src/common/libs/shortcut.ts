export type ShortcutMap = Record<string, {
    name?: string
    shortcut?: string;
}>;

export const getShortcutMap = async (): Promise<ShortcutMap> => {
    return await new Promise((resolve) => {
        chrome.commands.getAll((commands) => {
            const result: ShortcutMap = {};
            for (const cmd of commands) {
                if (cmd.name === undefined) {
                    continue
                }
                result[cmd.name] = {
                    name: cmd.name,
                    shortcut: cmd.shortcut ?? '', // 未設定の場合は空文字列
                };
            }
            resolve(result);
        });
    });
};
