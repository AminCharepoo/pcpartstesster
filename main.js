


document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById("addButton");
    const partNameInput = document.getElementById("partName");
    // const partPriceInput = document.getElementById("partPrice");
    const partLinkInput = document.getElementById("partLink");
    const auctionLinkInput = document.getElementById("auctionLink");
    

    const buttonsDiv = document.querySelector(".buttons");

    addButton.addEventListener("click", function () {
        console.log("Button Clicked");
        const partName = partNameInput.value;
        // const partPrice = partPriceInput.value;
        const partLink = partLinkInput.value;
        const auctionLink = auctionLinkInput.value;

        if (partName /*&& partPrice */&& partLink && auctionLink) {
            createButton(partName, /*partPrice,*/ partLink, auctionLink );
            saveToLocalStorage(partName, /*partPrice*/ partLink, auctionLink);
            partNameInput.value = "";
            // partPriceInput.value = "";
            partLinkInput.value = "";
            auctionLinkInput.value = "";
        }
    });

 
    loadButtonsFromLocalStorage();

    function createButton(partName, /*partPrice*/ partLink, auctionLink) {
        const buttonContainer = document.createElement("div");
        buttonContainer.className = "button-container";
        

        const partButton = document.createElement("button");
        partButton.className = "button";
        partButton.textContent = partName /*+ " " + "$" + partPrice*/;
        partButton.title = partName;

        const auctionButton = document.createElement("button");
        auctionButton.className = "button";
        auctionButton.textContent = "Auction Link"

        const editButton = document.createElement("button")
        editButton.className = "button edit-button";
        editButton.textContent = "Edit";

        const deleteButton = document.createElement("button");
        deleteButton.style.verticalAlign = "middle";
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Delete";

        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = partName;
        editInput.className = "edit-input";   
        editInput.style.display = "none"; 
        
        const editInputPrice = document.createElement("input"); 
        editInputPrice.type = "text";
        // editInputPrice.value = partPrice;
        editInputPrice.className = "edit-input";
        editInputPrice.style.display = "none";

        const editInputLink = document.createElement("input"); // Added input for part link
        editInputLink.type = "text";
        editInputLink.value = partLink;
        editInputLink.className = "edit-input";
        editInputLink.style.display = "none";

        const editInputAuctionLink = document.createElement("input"); // Added input for auction link
        editInputAuctionLink.type = "text";
        editInputAuctionLink.value = auctionLink;
        editInputAuctionLink.className = "edit-input";
        editInputAuctionLink.style.display = "none";

        
        const saveButton = document.createElement("button");
        saveButton.className = "button save-button"
        saveButton.textContent = "Save";
        saveButton.style.display = "none";

        const nextButton1 = document.createElement("button");
        nextButton1.className = "button next-button1";
        nextButton1.textContent = "Next";
        nextButton1.style.display = "none";

        const nextButton2 = document.createElement("button");
        nextButton2.className = "button next-button2";
        nextButton2.textContent = "Next";
        nextButton2.style.display = "none";



        
        const partLinkInput = document.createElement("input");
        partLinkInput.type = "text";
        partLinkInput.value = partLink;
        partLinkInput.className = "edit-input";
        partLinkInput.style.display = "none";

        const auctionLinkInput = document.createElement("input");
        auctionLinkInput.type = "text";
        auctionLinkInput.value = auctionLink;
        auctionLinkInput.className = "edit-input";
        auctionLinkInput.style.display = "none";


        partButton.addEventListener("click", function () {
            window.open(partLink, "_blank");
        });

        auctionButton.addEventListener("click", function() {
            window.open(auctionLink, "_blank");
        })

        editButton.addEventListener("click", function () {

            auctionButton.style.display = "none";

            deleteButton.style.display = "none";
            editButton.style.display = "none";
            
            
            partButton.style.display = "block";
            editInput.style.display = "block";
            // editInputPrice.style.display = "block"; 
            editInputLink.style.display = "none"; 
            editInputAuctionLink.style.display = "none"; 
            saveButton.style.display = "block";
            nextButton1.style.display = "block";
            nextButton2.style.display = "none";


        });


        nextButton1.addEventListener("click", function() {
            editInput.style.display = "none";
            editInputLink.style.display = "block";
            nextButton2.style.display = "block";
            nextButton1.style.display = "none";
        })





        saveButton.addEventListener("click", function () {
            const newPartName = editInput.value;
            // const newPartPrice = editInputPrice.value;
            const newPartLink = editInputLink.value;
            const newAuctionLink = editInputAuctionLink.value;
        
            partName = newPartName;
            // partPrice = newPartPrice;
            partLink = newPartLink;
            auctionLink = newAuctionLink;
        
            partButton.textContent = newPartName /*+ " " + "$" + newPartPrice*/;
            partButton.style.display = "block";

            auctionButton.style.display = "block";
            deleteButton.style.display = "block"; 
            editButton.style.display = "block"

            
            
            editInput.style.display = "none";
            // editInputPrice.style.display = "none";
            editInputLink.style.display = "none";
            editInputAuctionLink.style.display = "none";
            saveButton.style.display = "none";

            
        });

        deleteButton.addEventListener("click", function () {
            buttonContainer.remove();
            removeFromLocalStorage(partName);
        });

        buttonContainer.appendChild(partButton);
        buttonContainer.appendChild(auctionButton)
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);
        buttonContainer.appendChild(editInput);
        buttonContainer.appendChild(saveButton);
        buttonsDiv.appendChild(buttonContainer);
    }

    function saveToLocalStorage(partName, /*partPrice*/ partLink, auctionLink) {
        const data = JSON.stringify({ partName,/*partPrice*/ partLink, auctionLink });
        localStorage.setItem(partName, data);
    }

    function removeFromLocalStorage(partName) {
        localStorage.removeItem(partName);
    }

    function updateInLocalStorage(partName, newPartName,/*partPrice*/ partLink, auctionLink) {
        removeFromLocalStorage(partName);
        saveToLocalStorage(newPartName,/*partPrice*/ partLink, auctionLink);
    }

    function loadButtonsFromLocalStorage() {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const data = JSON.parse(localStorage.getItem(key));
            createButton(data.partName, /*data.partPrice,*/ data.partLink, data.auctionLink);
        }
    }
});

