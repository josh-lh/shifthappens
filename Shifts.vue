<template>
    <b-container class="container-desktop">
        <br>
        <h1 class="title"> Shift Management</h1>
        <i>The only place to manage all shift types.</i>
        <br/>
        <br/>
        <!--<b-container fluid style="position:relative">-->
            <b-card-group deck class="mx-auto center-card-group" >
                <b-card title="Create a New Shift Pattern"
                        img-src="https://images.unsplash.com/photo-1518169709214-6d2fff4a8a4e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=584ea86c10f32759ccb0e29439
                        ea265c&auto=format&fit=crop&w=750&q=80"
                        img-alt="Image"
                        img-top
                        tag="article"
                        style="max-width: 20rem;"
                        class="mb-2"
                        align="center">
                    <p class="card-text">
                    Trying to add a new shift pattern that doesn't already exist?
                    </p>
                    <b-button slot="footer" to="/manage/shifts/new" variant="cshare">
                    Take me there!</b-button>
                </b-card>
               <b-card title="Generate Shifts"
                        img-src="https://images.unsplash.com/photo-1518169709214-6d2fff4a8a4e?
                        ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=584ea86c10f32759ccb0e29439e
                        a265c&auto=format&fit=crop&w=750&q=80"
                        img-alt="Image"
                        img-top
                        tag="article"
                        style="max-width: 20rem;"
                        class="mb-2"
                        align="center">
                    <p class="card-text">
                    Generate shifts based on an existing shift pattern to create the shifts within
                     the calendar for any team!
                    </p>
                    <b-button slot="footer" to="/manage/shifts/generate"
                    variant="cshare">Generate</b-button>
                </b-card>
            </b-card-group>
        <!--</b-container>-->
    </b-container>
</template>


<script>
export default {
};
</script>

<style>
    @media screen and (min-width: 1000px){
        .container-desktop{
            width:1000px;
        }
        .center-card-group{
            padding: 50px 50px 0 140px;
        }
    }

.title{
    padding-bottom:10px;
    border-bottom: 1px solid;
}

</style>
