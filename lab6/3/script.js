function question(data) {
      data.forEach((element,index) => {
        let groupname = "quiz"+ index;
        ++index;

        let questionHead = document.createElement("p");
        let questionText = document.createTextNode(index + ". " + element.question);
        questionHead.appendChild(questionText);
        document.body.appendChild(questionHead);

        let aHead = document.createElement("input");
        aHead.type = "radio";
        aHead.name = groupname;
        let label = document.createElement("label");
        let aText = document.createTextNode("A. "+element.answers.a);
        let stong = document.createElement("strong");
        stong.appendChild(aText);
        label.appendChild(stong);
        document.body.appendChild(aHead);
        document.body.appendChild(label);
        document.body.appendChild(document.createElement("br"));
        
        let bHead = document.createElement("input");
        bHead.type = "radio";
        bHead.name = groupname;
        let label2 = document.createElement("label");
        let bText = document.createTextNode("B. "+element.answers.b);
        let stong2 = document.createElement("strong");
        stong2.appendChild(bText);
        label2.appendChild(stong2);
        document.body.appendChild(bHead);
        document.body.appendChild(label2);
        document.body.appendChild(document.createElement("br"));
        
        let cHead = document.createElement("input");
        cHead.type = "radio";
        cHead.name = groupname;
        let label3 = document.createElement("label");
        let cText = document.createTextNode("C. "+element.answers.c);
        let stong3 = document.createElement("strong");
        stong3.appendChild(cText);
        label3.appendChild(stong3);
        document.body.appendChild(cHead);
        document.body.appendChild(label3);

      });
   }
  
   fetch('questionAnswerData.json')
      .then(response => response.json())
      .then(data => question(data))
      .catch(error => console.log('error', error));