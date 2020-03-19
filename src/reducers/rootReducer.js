export default function changeTitle(state, action) {
    switch (action.type) {
        case 'SET-TITLE':
            return document.getElementById("title").value;
        case 'ADD':
            return "added";
        default:
            return state;
    }
}