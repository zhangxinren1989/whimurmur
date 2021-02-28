$(function(){
    var treeData = [
          {
            text: '整体说明',
            href: '/article/whimurmurHelpMain',
            tags: ['whimurmur模板整体说明'],
            state: {}
          },
          {
            text: '功能介绍',
            href: '##',
            tags: ['介绍模板现有的功能'],
            selectable: false,
            state: {},
            nodes: [
                {
                    text: '整体功能',
                    href: '##',
                    tags: ['网站整体功能'],
                    selectable: false,
                    state: {},
                    nodes: [
                        {
                            text: '主题功能',
                            href: '/article/whimurmurHelpTheme',
                            tags: ['主题功能介绍'],
                            state: {}
                        },
                        {
                            text: '返回顶部功能',
                            href: '/article/whimurmurHelpPageTop',
                            tags: ['返回顶部介绍'],
                            state: {}
                        },
                        {
                            text: '双击标记功能',
                            href: '/article/whimurmurHelpDblClickMark',
                            tags: ['双击标记介绍'],
                            state: {}
                        },
                        {
                            text: '定时开启夜间主题功能',
                            href: '/article/whimurmurHelpSchedualNightTheme',
                            tags: ['定时开启夜间主题介绍'],
                            state: {}
                        },
                        {
                            text: 'live2d看板娘功能',
                            href: '/article/whimurmurHelpLive2d',
                            tags: ['live2d看板娘功能介绍'],
                            state: {}
                        },
                        {
                            text: '文字/页面背景功能',
                            href: '/article/whimurmurHelpBackground',
                            tags: ['页面背景功能介绍'],
                            state: {}
                        }
                    ]
                },
                {
                    text: '页首页脚功能',
                    href: '##',
                    tags: ['页首页脚功能'],
                    selectable: false,
                    state: {},
                    nodes: [
                        {
                            text: '导航功能',
                            href: '/article/whimurmurHelpNav',
                            tags: ['导航功能介绍'],
                            state: {}
                        },
                        {
                            text: '页脚设置功能',
                            href: '/article/whimurmurHelpFooter',
                            tags: ['页脚设置介绍'],
                            state: {}
                        },
                        {
                            text: '页脚图片弹幕功能',
                            href: '/article/whimurmurHelpFooterImageBarrage',
                            tags: ['页脚设置介绍'],
                            state: {}
                        }
                    ]
                },
                {
                    text: '文章（产品）功能',
                    href: '##',
                    tags: ['文章（产品）功能'],
                    selectable: false,
                    state: {},
                    nodes: [
                        {
                            text: '分享功能',
                            href: '/article/whimurmurHelpShare',
                            tags: ['网页分享介绍'],
                            state: {}
                        },
                        {
                            text: '文章置顶功能',
                            href: '/article/whimurmurHelpArticleTop',
                            tags: ['文章置顶介绍'],
                            state: {}
                        },
                        {
                            text: '上（下）一篇文章（一个产品）功能',
                            href: '/article/whimurmurHelpPreNextItem',
                            tags: ['上（下）一篇文章（一个产品）介绍'],
                            state: {}
                        },
                        {
                            text: '文章尾注功能',
                            href: '/article/whimurmurHelpEndNote',
                            tags: ['文章尾注介绍'],
                            state: {}
                        },
                        {
                            text: '文章点赞/打赏',
                            href: '/article/whimurmurHelpThumbUpDonate',
                            tags: ['文章点赞/打赏'],
                            state: {}
                        },
                        {
                            text: '文章目录功能',
                            href: '/article/whimurmurHelpArticleCatalog',
                            tags: ['文章目录功能介绍'],
                            state: {}
                        },
                        {
                            text: '文章(产品)图片查看功能',
                            href: '/article/whimurmurHelpImageView',
                            tags: ['文章(产品)正文图片查看介绍'],
                            state: {}
                        },
                        {
                            text: '区分自己文章/转载文章功能',
                            href: '/article/whimurmurHelpDiffSourceArticle',
                            tags: ['区分自己文章/转载文章介绍'],
                            state: {}
                        },
                        {
                            text: '外链文章新窗口打开功能',
                            href: '/article/whimurmurHelpLinkToArticle',
                            tags: ['外链文章新窗口打开介绍'],
                            state: {}
                        },
                        {
                            text: '文章页数功能',
                            href: '/article/whimurmurHelpArticlePages',
                            tags: ['文章页数功能介绍'],
                            state: {}
                        }
                    ]
                },
                {
                    text: '侧边栏功能',
                    href: '##',
                    tags: ['侧边栏功能'],
                    selectable: false,
                    state: {},
                    nodes: [
                        {
                            text: '搜索功能',
                            href: '/article/whimurmurHelpSearch',
                            tags: ['搜索介绍'],
                            state: {}
                        },
                        {
                            text: '每日热词功能',
                            href: '/article/whimurmurHelpHotWord',
                            tags: ['每日热词介绍'],
                            state: {}
                        },
                        {
                            text: '免费商品展示功能',
                            href: '/article/whimurmurHelpFreeProductShow',
                            tags: ['免费商品展示介绍'],
                            state: {}
                        },
                        {
                            text: '浮动标签云功能',
                            href: '/article/whimurmurHelpTagCloud',
                            tags: ['浮动标签云介绍'],
                            state: {}
                        },
                    ]
                },
                {
                    text: '其它功能',
                    href: '##',
                    tags: ['其它功能'],
                    selectable: false,
                    state: {},
                    nodes: [
                        {
                            text: '广告功能',
                            href: '/article/whimurmurHelpAd',
                            tags: ['广告功能介绍'],
                            state: {}
                        }
                    ]
                }
              
            ]
          },
          {
            text: '页面介绍',
            href: '##',
            tags: ['介绍模板各个页面'],
            state: {},
            selectable: false,
            nodes: [
              {
                text: '首页',
                href: '/article/whimurmurHelpHomepage',
                tags: ['首页介绍'],
                state: {}
              },
              {
                text: '侧边栏',
                href: '/article/whimurmurHelpSidebar',
                tags: ['侧边栏介绍'],
                state: {}
              },
              {
                text: '文章页',
                href: '/article/whimurmurHelpArticle',
                tags: ['文章页介绍'],
                state: {}
              },
              {
                text: '产品页',
                href: '/article/whimurmurHelpProduct',
                tags: ['产品页介绍'],
                state: {}
              }
            ]
          },
          {
            text: '设置介绍',
            href: '##',
            tags: ['介绍后台设置'],
            state: {},
            selectable: false,
            nodes: [
                  {
                    text: '基础设置',
                    href: '##',
                    tags: ['网站基础设置'],
                    selectable: false,
                    state: {},
                    nodes: [
                      {
                        text: '页面设置',
                        href: '/article/whimurmurHelpBasePageSetting',
                        tags: ['页面设置'],
                        state: {}
                      },
                      {
                        text: '主题设置',
                        href: '/article/whimurmurHelpThemeSetting',
                        tags: ['主题设置'],
                        state: {}
                      },
                      {
                        text: '网站信息设置',
                        href: '/article/whimurmurHelpBaseSiteSetting',
                        tags: ['网站信息设置'],
                        state: {}
                      }
                    ]
                  },
                  {
                    text: '首页/侧边栏设置',
                    href: '##',
                    tags: ['网站首页，侧边栏的相关设置'],
                    selectable: false,
                    state: {},
                    nodes: [
                      {
                        text: '首页设置',
                        href: '/article/whimurmurHelpHomeageSetting',
                        tags: ['首页设置'],
                        state: {}
                      },
                      {
                        text: '侧边栏设置',
                        href: '/article/whimurmurHelpSidebarSetting',
                        tags: ['侧边栏设置'],
                        state: {}
                      }
                    ]
                  },
                  {
                    text: '文章/产品设置',
                    href: '##',
                    tags: ['网站文章页，产品页的相关设置'],
                    selectable: false,
                    state: {},
                    nodes: [
                      {
                        text: '文章设置',
                        href: '/article/whimurmurHelpArticleSetting',
                        tags: ['文章设置'],
                        state: {}
                      },
                      {
                        text: '产品设置',
                        href: '/article/whimurmurHelpProductSetting',
                        tags: ['产品设置'],
                        state: {}
                      }
                    ]
                  },
                  {
                    text: '代码设置',
                    href: '/article/whimurmurHelpCodeSetting',
                    tags: ['网站自定义代码设置'],
                    state: {}
                  },
                  {
                    text: '广告设置',
                    href: '/article/whimurmurHelpAdSetting',
                    tags: ['网站广告设置'],
                    state: {}
                  }
                ]
          }
        ];
        
        initHelpDocumentTree(treeData);
        initMainContent();
        initChangingBg();
});

function initHelpDocumentTree(treeData){
    var slug = window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1);
    loop:
    for(var i = 0; i < treeData.length; i++){
        if(treeData[i].nodes){
            for(var j = 0; j < treeData[i].nodes.length; j++){
                var node = treeData[i].nodes[j];
                if(node.nodes){
                    for(var k = 0; k < node.nodes.length; k++){
                        var subNode = node.nodes[k];
                        
                        if(subNode.href.substring(subNode.href.lastIndexOf("/") + 1) == slug){
                            treeData[i].state.expanded = true;
                            node.state.expanded = true;
                            subNode.state.selected = true;
                            break loop;
                        }
                    }
                }else{
                    if(node.href.substring(node.href.lastIndexOf("/") + 1) == slug){
                        treeData[i].state.expanded = true;
                        node.state.selected = true;
                        break loop;
                    }
                }
            }
        }else{
            if(treeData[i].href.substring(treeData[i].href.lastIndexOf("/") + 1) == slug){
                treeData[i].state.selected = true;
                break loop;
            }
        }
    }
    
    // 目录固定位置，高度适合页面
    $("#help-document").css("max-height", $(window).height() - $(".cl-header").height() - $(".cl-footer").height() - 40 + "px");

      $('#help-document').treeview({
        data: treeData,
    	showTags: false,
    	enableLinks: true,
    	levels: 1
      });
      
      $('#help-document').on('nodeSelected',function(event, data) {
          window.location.href = data.href;
      });
}

colors = [parseInt(Math.random()*256),parseInt(Math.random()*4) * 2 + 2,parseInt(Math.random()*256),parseInt(Math.random()*4) * 2 + 2,parseInt(Math.random()*256),parseInt(Math.random()*4) * 2 + 2];
function initChangingBg(){
    $(".cl-artical-content").css("background-color", 'rgba(' + colors[0] + ', ' + colors[2] + ', ' + colors[4] + ', 0.5)');
	for(var i = 0; i < 6; i += 2){
		(colors[i] + colors[i+1] > 255 && (colors[i+1] = -parseInt(Math.random()*4) * 2 - 2)) || (colors[i] + colors[i+1] < 0 && (colors[i+1] = parseInt(Math.random()*4) * 2 + 2));
		colors[i] += colors[i+1];
	}
	setTimeout(initChangingBg, 100);
}

function initMainContent(){
    // 取消a中的img的链接
    if($(".cl-artical a>img")){
        $(".cl-artical a>img").parent().attr("href", "##");
    }
    
    if($(".cl-artical img")){
        $(".cl-artical img").zoomify();
    }
    
    if($(".cl-artical blockquote")){
        $(".cl-artical blockquote").css({"border-left-width": "4px", "border-left-style": "solid"});
        $(".cl-artical blockquote").addClass("border-primary");
    }
}