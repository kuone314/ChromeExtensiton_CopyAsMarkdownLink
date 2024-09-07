import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

const Popup = () => {
  const [count, setCount] = useState(0);
  const [currentURL, setCurrentURL] = useState<string>();

  useEffect(() => {
    chrome.action.setBadgeText({ text: count.toString() });
  }, [count]);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      setCurrentURL(tabs[0].url);
    });
  }, []);

  const changeBackground = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0];
      if (tab.id) {
        chrome.tabs.sendMessage(
          tab.id,
          {
            color: "#555555",
          },
          (msg) => {
            console.log("result message:", msg);
          }
        );
      }
    });
  };

  function testFnc(): void {
    chrome.tabs.query(
      { active: true, currentWindow: true },
      function (tabs) { setCurrentURL(tabs[0].url); }
    );

    // https://stackoverflow.com/questions/19164474/chrome-extension-get-selected-text
    // chrome.tabs.executeScript({ code: 'window.getSelection().toString();' }, selectedText => {
    //   console.log(selectedText[0]);
    // });

    // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    //   // chrome.tabs.sendMessage(tabs[0].id!, { action: "getSelectedText" }, (response) => {
    //   //   // alert("a");
    //   //   console.log("a")
    //   //   console.log(response.toString());
    //   //   // alert(response.toString());
    //   // });

    //   // chrome.tabs.sendMessage(tabs[0].id!, { action: "getSelectedText" }, (response) => {
    //   //   // alert("a");
    //   //   console.log("a")
    //   //   console.log(response.toString());
    //   //   // alert(response.toString());
    //   // });
    //   chrome.scripting.executeScript({
    //     target: { tabId: tabs[0].id! },
    //     function: getSelectedText,
    //   }, (results) => {
    //     if (results && results[0]) {
    //       document.getElementById("selectedText")!.textContent = results[0].result;
    //     }
    //   });


    //   function getSelectedText() {
    //     return window?.getSelection()?.toString() ?? "error";
    //   }
    // });
    console.log("ab")
    console.log(window?.getSelection()?.toString() ?? "error")

    // chrome.runtime.sendMessage({ action: "requestSelectedText" });

    // chrome.tabs.getCurrent(
    //   (tab)=>{
    //     tab.get
    //   }
    // )

    // chrome.tabs.getSelected(tab=>{  // 現在のタブを取得
    //     Data.Title = tab.title;  // tabに現在のタブが格納されている（？）。
    //     Data.URL = tab.url;    // tab.titleには現在開いているタブのページタイトルが、tab.urlにはURLが格納されている。
    //     console.log(Title: ${Data.Title});  // 出力は、「ポップアップを検証」で見れる。
    //     console.log(URL: ${Data.URL});
    // });


    // TODO:起動方法
    // Pouupから
    // TODO:選択文字列の取得
    // const selectedStr = window.getSelection()?.toString() ?? "Error";
    // alert(selectedStr);
    // setCurrentURL(selectedStr);
    // TODO:MarkDownのリンク形式に
    // TODO:クリップボードにコピー

    // currentURL = "" // NG!
    // setCurrentURL(""); // OK
  }

  return (
    <>
      <ul style={{ minWidth: "700px" }}>
        <li>Current URL: {currentURL}</li>
        <li>Current Time: {new Date().toLocaleTimeString()}</li>
      </ul>
      <button
        onClick={testFnc}
      >
        test
      </button>
      <button
        onClick={() => setCount(count + 1)}
        style={{ marginRight: "5px" }}
      >
        count up
      </button>
      <button onClick={changeBackground}>change background</button>
    </>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
