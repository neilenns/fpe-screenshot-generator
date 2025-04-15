import html2canvas from "html2canvas";

export async function copyFpeToClipboard(): Promise<void> {
  const container = document.getElementById("fpe-container");

  if (!container) {
    console.error("fpe-container not found");
    return;
  }

  const canvas = await html2canvas(container, {
    backgroundColor: null, // keep transparency if needed
  });

  canvas.toBlob((blob) => {
    if (!blob) {
      console.error("Failed to create image blob");
      return;
    }

    navigator.clipboard
      .write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ])
      .catch((err: unknown) => {
        console.error("Failed to copy image to clipboard: ", err);
      });

    console.log("FPE screenshot copied to clipboard!");
    alert("FPE screenshot copied to clipboard!");
  });
}
