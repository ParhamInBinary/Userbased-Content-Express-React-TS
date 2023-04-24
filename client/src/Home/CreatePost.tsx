import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export function CreatePost() {
    return(
        <>
            <div className="postInputContainer" style={{ paddingTop: '7rem'}}>
                <TextField
                    id="outlined-multiline-static"
                    label="Post"
                    multiline
                    fullWidth
                    rows={4}
                    placeholder='A penny for your thoughts'
                    />
            </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end'}}>
            <Button variant="contained" size="medium" style={{ marginTop: '1rem'}}>
          Post
        </Button>
        </div>
        </>
    )
}