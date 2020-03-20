window.addEventListener('load',function(){

    }
  );
//
// currentPersentation[]
//
// files[]

function NameSection(imageSoure,filename,presentationMode)
{
    //logo filename presentation-mode
    this.logoSource = imageSoure;
    this.filename = filename;
    this.presentationMode = presentationMode;

    var nameSection = document.createElement('div');
    nameSection.classList.add('clearfix','name-section');
    this.nameSectionDOM = nameSection;

    var logo = document.createElement('img');
    logo.src = this.logoSource;
    logo.classList.add('logo');

    var filename = document.createElement('p');
    filename.innerHTML = localStorage.getItem('filename') || this.filename;
    filename.setAttribute('id','filename');
    filename.classList.add('filename');
    filename.title = 'Click to change file name';
    filename.contentEditable = 'true';

    filename.addEventListener('blur',function(){
        localStorage.setItem('filename',filename.innerHTML);
    });

    nameSection.appendChild(logo);
    nameSection.appendChild(filename);


    var mode = document.createElement('div');
    mode.classList.add('mode');
    this.modeDOM = mode;

    var anchor = document.createElement('a');
    anchor.innerHTML = presentationMode;

    mode.appendChild(anchor);

    var nameSectionWrapper = document.createElement('div');
    nameSectionWrapper.classList.add('clearfix','name-section-wrapper');

    nameSectionWrapper.appendChild(nameSection);
    nameSectionWrapper.appendChild(mode);

    var toolBarWrapper = document.createElement('div');
    toolBarWrapper.classList.add('toolbar-wrapper');

    var a = document.createElement('a');
    a.classList.add('add-icon');
    a.innerHTML = ' + ';
    a.title = 'Add New Slide';
    this.addButtonDOM = a;

    toolBarWrapper.appendChild(a);

    var header = document.createElement('header');

    header.appendChild(nameSectionWrapper);
    header.appendChild(toolBarWrapper);

    document.body.appendChild(header);


}

function Slide(index)
{
  this.slideIndex = index;

  this.createNewSlide = function(){

    var slide = document.createElement('div');
    slide.classList.add('slide');
    this.slideDOM = slide;

    var slideNum = document.createElement('div');
    slideNum.classList.add('slide-num');

    var numSpan = document.createElement('span');
    numSpan.setAttribute('id','slideNum');
    numSpan.innerHTML = index;
    this.numSpanDOM = numSpan;

    slideNum.appendChild(numSpan);

    var slidePreview = document.createElement('div');
    slidePreview.classList.add('slide-preview');


    var slidePreviewBox = document.createElement('div');
    slidePreviewBox.classList.add('slide-preview-box');
    this.slidePreviewBoxDOM = slidePreviewBox;

    var previewText = document.createElement('p');
    previewText.classList.add('preview-text');
    this.previewTextDOM = previewText;
    previewText.innerHTML = 'Slide '+ index;

    slidePreviewBox.appendChild(previewText);
    slidePreview.appendChild(slidePreviewBox);

    var slideBox = document.createElement('div');
    slideBox.classList.add('slide-box','clearfix');
    slideBox.appendChild(slideNum);
    slideBox.appendChild(slidePreview);

    var separator = document.createElement('div');
    separator.classList.add('separator');

    slide.appendChild(slideBox);
    slide.appendChild(separator);

    return this.slideDOM;
  }

}

function SlideSection()
{
   this.createNewSection = function(layout){

       var section = document.createElement('div');
       section.classList.add('section');
       section.appendChild(layout);
       this.sectionDOM = section;
  }
}


function Layout()
{
   this.createDefaultLayout = function(slide)
   {
      var layout = document.createElement('div');

      var titleBox = document.createElement('div');
      titleBox.classList.add('title-box');
      titleBox.setAttribute('id','title-box');
      titleBox.innerHTML = 'Click here to add title';
      titleBox.contentEditable = 'true';


      var contentBox = document.createElement('div');
      contentBox.classList.add('content-box');
      contentBox.setAttribute('id','content-box');
      contentBox.contentEditable = 'true';
      contentBox.innerHTML = 'Click to add content';



      titleBox.addEventListener('blur',function () {
          if(titleBox.innerHTML === ''){
             titleBox.innerHTML = 'Click here to add title';
             slide.previewTextDOM.innerHTML = 'Slide '+slide.slideIndex;

          }
          else if(titleBox.innerHTML !== 'Click here to add title'){
            titleBox.style.outline = '0';
            slide.previewTextDOM.innerHTML = titleBox.innerHTML;

          }




      });


      titleBox.addEventListener('focus',function () {
          if(titleBox.innerHTML === 'Click here to add title'){
             titleBox.innerHTML = '';
          }

          titleBox.style.outline = '1px solid #d3d3d3';


      });


             contentBox.addEventListener('blur',function () {
               if(contentBox.innerHTML === ''){
                   contentBox.innerHTML = 'Click to add content';
               }
               else if(contentBox.innerHTML !== 'Click to add content'){
                  contentBox.style.outline = '0';
             }

            });


            contentBox.addEventListener('focus',function () {
                if(contentBox.innerHTML === 'Click to add content'){
                   contentBox.innerHTML = '';
                }

                contentBox.style.outline = '1px solid #d3d3d3';


            });


      layout.classList.add('layout-wrapper');
      layout.appendChild(titleBox);
      layout.appendChild(contentBox);

      return layout;
   }
}


function Presentation()
{
   var that = this;
  this.slides = [];
  this.slideSections = [];

  var rightSideBarWrapper = document.createElement('div');
  rightSideBarWrapper.classList.add('right-sidebar-wrapper');
  this.rightSideBarWrapperDOM = rightSideBarWrapper;

  var mainSectionWrapper = document.createElement('div');
  mainSectionWrapper.classList.add('main-section-wrapper');
  this.mainSectionWrapperDOM = mainSectionWrapper;

  var container = document.createElement('div');
  container.classList.add('container','clearfix');

  container.appendChild(rightSideBarWrapper);
  container.appendChild(mainSectionWrapper);

  this.containerDOM = container;

  document.body.appendChild(container);

  this.hideAllSections = function(){
    for(var i=0; i<this.slideSections.length;i++){
     this.slideSections[i].sectionDOM.style.display= 'none';
     this.slides[i].slideDOM.classList.remove('slide-active');
    }
  }

  this.showCurrentSection = function(index){
    this.slideSections[index].sectionDOM.style.display = 'block';
    this.slides[index].slideDOM.classList.add('slide-active');
  }

  this.createNewSlideAndSection = function(layout){


    var slide = new Slide(this.slides.length+1);
    slide.createNewSlide();

    for(var i=0; i<this.slides.length;i++){
      this.slides[i].slideDOM.classList.remove('slide-active');
    }
    slide.slideDOM.classList.add('slide-active');
    slide.slidePreviewBoxDOM.addEventListener('click',function(){
          that.hideAllSections();
          that.showCurrentSection(slide.slideIndex-1);
    });
    this.slides.push(slide);
    this.rightSideBarWrapperDOM.appendChild(slide.slideDOM);

    var layoutObj = new Layout();
    var layout = layoutObj.createDefaultLayout(slide);

    var slideSection = new SlideSection();
    slideSection.createNewSection(layout);
    this.slideSections.push(slideSection);

    this.mainSectionWrapperDOM.appendChild(slideSection.sectionDOM);
    this.hideAllSections();
    this.showCurrentSection(this.slideSections.length-1);
  }
}



var n = new NameSection('images/icon.png','FileName','Present');
var p = new Presentation();
p.createNewSlideAndSection();

n.addButtonDOM.addEventListener('click',function(){
  p.createNewSlideAndSection();

});
