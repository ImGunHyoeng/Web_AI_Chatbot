class Chatbox
{
    constructor()
    {
        this.args={
            openButton:document.querySelector('.chatbox__button'),//html에 있는 박스와 버틍네 대한 기능이다.
            chatBox:document.querySelector('.chatbox__support'),
            sendButton:document.querySelector('.send__button')
        }
        this.state=false;
        this.messages=[];
    }

    display()
    {
        const {openButton,chatBox,sendButton}=this.args;//생성자로 부터 인수를 전달받는다

        openButton.addEventListener('click',()=>this.toggleState(chatBox))//toggleState는 해당하는 것이 활성화 되는지 않되는지를 판단하는 기준이다.

        sendButton.addEventListener('click',()=>this.onSendButton(chatBox))

        const node =chatBox.querySelector('input');
        node.addEventListener("keyup",({key})=>
        {
            if(key==="Enter")
            {
                this.onSendButton(chatBox)
            }
        })
    }

    toggleState(chatbox){
        this.state=!this.state;

        if(this.state){
            chatbox.classList.add('chatbox--active')//클래스 속성에 접근할 수 있는 것이다.

        }
        else{
            chatbox.classList.remove('chatbox--active')//챗박스가 활성화 되는 것을 알 수 있다.
        }
    }
//메시지 보내기
    onSendButton(chatbox)
    {
        var textField=chatbox.querySelector('input');//input타입에 해당하는 값을 집어넣는다.
        let text1=textField.value
        if(text1==="")
        {
            return;
        }
        let msg1={ name: "User", message: text1}//챗봇으로 메시지를 보내기 위해서 dictionary형태로 저장,python과 같은 키로 설정해줘야한다.
        this.messages.push(msg1);//메시지 배열에 해당하는 값을 집어넣어서 사용
        //해당위치로 파일 보내기
        fetch($SCRIPT_ROOT+'/predict',{//보내는 곳,json화 해서 보내기,보내는 방식을 설정
            method:'POST',
            body: JSON.stringify({message:text1}),
            mode: 'cors',
            headers: {
                'Content-Type':'application/json'
            },
        })//보내고 나서 반응이 오는 것을 기다린다.
        .then(r=>r.json())//json을 가지고 해당하는 값을 텍스트박스에 보낸다.
        .then(r=>{
            let msg2={name:"Sam", message: r.answer};
            this.messages.push(msg2);
            this.updateChatText(chatbox)
            textField.value=''
        }).catch((error)=>{
            console.error('Error:',error);
            this.updateChatText(chatbox)
            textField.value=''
           });
    }

    updateChatText(chatbox)
    {
        var html='';
        this.messages.slice().reverse().forEach(function(item,index)
        {
            if(item.name==="Sam")
            {
                html+='<div class="messages__item messages__item--visitor">'+item.message+'</div>'
            }
            else
            {
                html+='<div class="messages__item messages__item--operator">'+item.message+'</div>'
            }

        });

        const chatmessage=chatbox.querySelector('.chatbox__messages');//해당하는 칸과 연동을 시켜줌.
        chatmessage.innerHTML=html;//html의 문장을 추가하는 구문이다.
    }
}
const chatbox=new Chatbox();
chatbox.display();