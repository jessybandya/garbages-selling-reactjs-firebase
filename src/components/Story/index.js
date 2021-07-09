import React from 'react';
import './style.css';
import StoryRow from './StoryRow';

function Story() {
    return (
        <div className="storyRow">
            <StoryRow image="https://www.capitalfm.co.ke/business/files/2020/01/mercedes-2019-e1580116714735.jpg" profileSrc="https://mhhinternational.com/sites/default/files/styles/blog_main_image/public/blog/BMW%20i8.jpg?itok=QGU_5WDV" title="Tony Ombati" />
            <StoryRow image="https://www.freemann.co.ke/sites/default/files/images/PHOTO-2018-07-24-19-04-30%20%281%29.jpg" profileSrc="https://s.yimg.com/xe/i/us/sp/v/soccer/wc/players/375334.3.png" title="Tony Kroos" />
            <StoryRow image="https://www.sciencenews.org/wp-content/uploads/2020/05/052020_ts_scientific-words_feat-1028x579.jpg" profileSrc="https://image.shutterstock.com/image-photo/buddha-statue-hyderabadhyderabadindia-260nw-1366155431.jpg" title="Job Mike" />
            <StoryRow image="https://pbs.twimg.com/media/ElZD-xtVcAEoDGD.png" profileSrc="https://i.insider.com/5d3b1b1036e03c04ee1b10f5?width=1200&format=jpeg" title="Chris Brown" />
            <StoryRow image="https://cf.bstatic.com/images/hotel/max1024x768/104/104819490.jpg" profileSrc="https://www.article19.org/wp-content/uploads/2020/05/burundi-flag.png" title="Burundian Boy" />

             
        </div>
    )
}

export default Story
