import axios from 'axios';
const URL = "https://fequentquestionsserver.vercel.app/languages/";


const LanguageServices = {
    getAllLanguages: async () => {
        try {
            const response = await axios.get(URL, {
                headers: { 'Accept': 'application/json' }
            });
            return response.data;
        } catch (error) {
            console.log("Error fetching all langauages", error);
            throw error;
        }
    },
    addNewNote: async (body) => {
        try {
            const response = await axios.post(URL + "notes/newNote",body, {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            return response;
        } catch (error) {
            console.log("Error Creating a new note", error);
            throw error;
        }
    },
    // getNote: async (note_id) => {
    //     try {
    //          // Ensure the note_id is provided
    //         if (!note_id) {
    //             throw new Error("Note ID is required");
    //         }

    //         // Make the GET request to the API endpoint with the note_id
    //         const response = await axios.get(`${URL}getNote/${note_id}`, {
    //             // headers: {
    //             //     'Accept': 'application/json', // Ensure the Accept header is correctly set
    //             //     // Add Authorization or other headers here if required
    //             //     // 'Authorization': `Bearer ${yourAuthToken}`,
    //             // },
    //         });

    //     } catch (error) {
    //         console.log("Error Fetching Note", error);
    //         throw error;
    //     }
    // },
    updateNote : async ({ language_id, title, description, note_detail, note_id }) => {
        try {
            // Ensure required fields are included
            if (!language_id || !note_id) {
              throw new Error("Missing required fields: language_id and note_id are required.");
            }
        
            // Create the request body
            const requestBody = {
              language_id,
              title,
              description,
              note_detail,
              note_id
            };
            // Set the headers, e.g., for JSON and authorization (if needed)
            const headers = {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              // 'Authorization': `Bearer ${yourAuthToken}`, // Uncomment if you need an auth token
            };
        
            const response = await axios.put(URL+'notes/updateNote', requestBody, { headers });
        
            // Return the updated note data or a success message
            return response.data;
          } catch (error) {
            console.error("Error updating note:", error);
            throw error; // Re-throw the error for further handling if needed
          }
      },
    deleteNote: async (body) => {
        try {
            const response = await axios.delete(URL + "deleteNote", {
                headers: {
                    'Content-Type': 'application/json'
                },
                data: body
            });
            return response;
        } catch (error) {
            console.log("Error Deletenote", error);
            throw error;
        }
    }
}

export default LanguageServices;