import { addDoc, collection, where, query, onSnapshot, and, or, orderBy, setDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import moment from "moment/moment";
import { defineStore } from "pinia";
import { useQuasar } from "quasar";
import { auth, db } from "src/firebase";
import { ref } from "vue";

export const useDashboardStore = defineStore("dashboard", () => {

    const conversations = ref([]);
    const leftDrawerOpen = ref(false);
    const search = ref(null);
    const message = ref( null);
    const messages = ref([]);
    const currentConversation = ref(null);
    const currentConversationIndex = ref(0);
    const cardAddUser = ref(false);
    const $q = useQuasar();

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }

    async function setCurrentConversation(value) {
      currentConversation.value = value;
      message.value="";
      if(!$q.screen.md){
        leftDrawerOpen.value = false;
      }
      messages.value = [];
      dbMessages();
    }

    const addMessage = async () => {
      if (currentConversation.value !== null) {
        if(message.value !== "" && message.value.length > 0 ){
          addDoc(collection(db, "chats"), {
            text: message.value,
            uid: auth.currentUser.uid,
            uidSend: currentConversation.value.uidContact == auth.currentUser.uid ? currentConversation.value.uid : currentConversation.value.uidContact,
            time: Date.now(),
            read: false,
          });

          let existConversation = null, backupUser = null;

          conversations.value.forEach(element => {

            if(element.uidContact == currentConversation.value.uid || element.uid == currentConversation.value.uid)  {
              backupUser = element;
              return existConversation = element;
            }
          });

          if(existConversation === null){
            await addDoc(collection(db, "conversations"), {
              uid: auth.currentUser.uid,
              uidContact: currentConversation.value.uid,
              displayName: auth.currentUser.displayName,
              displayNameContact: currentConversation.value.displayName,
              photo: auth.currentUser.photoURL,
              photoContact: currentConversation.value.photo,
              lastMessage: message.value,
              time: Date.now(),
            });
          } else{
            const conversationRef = doc(db, "conversations", backupUser.id);
            await setDoc(conversationRef, {
              ...backupUser,
              lastMessage: message.value,
              time: Date.now(),
            });
          }

          message.value = null;
          window.scrollBy({
            top: window.innerHeight,
              behavior: 'smooth'
          })
        } else{
          $q.notify({
            type: 'negative',
            message: 'Impossible send the message'
          })
        }
      } else{
        $q.notify({
          type: 'negative',
          message: 'Select a friend to send the message'
        })
      }

    }

    const dbMessages = () => {
      clearTimeout();
      const q = query(collection(db, "chats"), or(
          where("uid", "==", auth.currentUser.uid),
          where("uidSend", "==", auth.currentUser.uid),
        )
      );

      if(!currentConversation.value.uidContact){
        currentConversation.value.uidContact = currentConversation.value.uid;
      }

      onSnapshot(q, (querySnapshot) => {
        let messagesGet = [];
        querySnapshot.forEach((doc) => {
          if(doc.data().uid == currentConversation.value.uidContact || doc.data().uidSend == currentConversation.value.uidContact){
            messagesGet.push(doc.data());
          }
        });
        messagesGet.sort((value, nextValue) => (value.time - nextValue.time));
        messagesGet.forEach((el, index) => {
          const date = new Date(el.time);
          messagesGet[index]= {
            ...messagesGet[index],
            newTime: moment(date, "YYYYMMDD").fromNow()
          }
        });
        messages.value = messagesGet;
        setInterval(evaluateDate, 3000);
      });
    }

    const getConversations = () => {
      const q = query(collection(db, "conversations"), or(
          where("uid", "==", auth.currentUser.uid),
          or(
            where("uidContact", "==", auth.currentUser.uid),
          )
        )
      );

      onSnapshot(q, (querySnapshot) => {
        let conversationsGet = [];
        let index = 0;

        querySnapshot.forEach((doc) => {
          conversationsGet.push(doc.data());
          conversationsGet[index] = {...conversationsGet[index], id: doc.id};
          index++;
        });

        conversationsGet.sort((value, nextValue) => (nextValue.time - value.time));
        conversationsGet.forEach((el, index) => {
          const date = new Date(el.time);
          conversationsGet[index]= {
            ...conversationsGet[index],
            newTime: moment(date, "YYYYMMDD").fromNow()
          }
        });
        if(conversationsGet.length > 0){
          setCurrentConversation(conversationsGet[0]);
        }
        conversations.value = conversationsGet;
      });
    }

    const evaluateDate = () => {
      messages.value.forEach((el, index) => {
        const date = new Date(el.time);
        messages.value[index].newTime = moment(date, "YYYYMMDD").fromNow()
      });
      conversations.value.forEach((el, index) => {
        const date = new Date(el.time);
        conversations.value[index].newTime = moment(date, "YYYYMMDD").fromNow()
      });
    }

    return {
      conversations,
      leftDrawerOpen,
      search,
      message,
      messages,
      currentConversationIndex,
      currentConversation,
      toggleLeftDrawer,
      setCurrentConversation,
      cardAddUser,
      addMessage,
      getConversations
    };
});
