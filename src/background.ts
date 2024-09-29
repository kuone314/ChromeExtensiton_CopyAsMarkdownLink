function polling() {
  console.log("polling");

  setTimeout(polling, 1000 * 30);
}

polling();

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "sampleContextMenu",
    title: "MarkDownリンクとしてコピー",
    contexts: ["selection"],
  });
});

// コンテキストメニューがクリックされたときの処理
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "sampleContextMenu") {
    const url = info.frameUrl ?? info.pageUrl;
    const txt = "[" + info.selectionText + "](" + url + ")";
    console.log(txt);

    saveToClipboard(txt);
  }
});


function saveToClipboard(str: string) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id ?? 0 },
      func: (textToCopy: string) => {
        navigator.clipboard.writeText(textToCopy).then(() => {
          console.log("Text copied to clipboard");
        }).catch(err => {
          console.error("Failed to copy text: ", err);
        });
      },
      args: [str]  // 関数に渡す引数
    });
  });
}

