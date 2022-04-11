function changeSelect() {
    if (document.getElementById("ratioChoice").value == "1") {
        document.getElementById("ratioText").innerHTML = "The current ratio is a liquidity ratio that measures a companys ability to pay short-term obligations or those due within one year. It tells investors and analysts how a company can maximize the current assets on its balance sheet to satisfy its current debt and other payables. A current ratio that is in line with the industry average or slightly higher is generally considered acceptable. A current ratio that is lower than the industry average may indicate a higher risk of distress or default. Similarly, if a company has a very high current ratio compared with its peer group, it indicates that management may not be using its assets efficiently.";
    } else if (document.getElementById("ratioChoice").value == "2") {
        document.getElementById("ratioText").innerHTML = "";
    } else if (document.getElementById("ratioChoice").value == "3") {
        document.getElementById("ratioText").innerHTML = "The quick ratio is an indicator of a company’s short-term liquidity position and measures a company’s ability to meet its short-term obligations with its most liquid assets. Since it indicates the company’s ability to instantly use its near-cash assets (assets that can be converted quickly to cash) to pay down its current liabilities, it is also called the acid test ratio. An acid test is a slang term for a quick test designed to produce instant results.";
    } else if (document.getElementById("ratioChoice").value == "4") {
        document.getElementById("ratioText").innerHTML = "NOTE [DATE] ...";
    }
}