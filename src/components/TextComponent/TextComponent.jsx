import React from 'react';
import parse from 'html-react-parser';

const TextComponent = ({ htmlString }) => {
  // Parse the HTML string and apply Tailwind classes dynamically
  const renderParsedHTML = () => {
    const parsedHtml = parse(htmlString, {
      replace: (domNode) => {
        // Checking if domNode is a valid element node
        if (domNode && domNode.type === 'tag') {
          switch (domNode.name) {
            case 'h':
              // Replace 'h' with 'h1' and apply the Tailwind styles
              return (
                <h1 className="text-white mb-2 text-[30px]" key={Math.random()}>
                  {domNode.children && domNode.children.length > 0 ? domNode.children[0].data : ""}
                </h1>
              );
            case 'p':
              return (
                <p className="text-[#9198a1] text-[20px]" key={Math.random()}>
                  {domNode.children && domNode.children.length > 0 ? domNode.children[0].data : ""}
                </p>
              );
            case 'ul':
              return (
                <ul className="pl-8 list-disc text-[20px]"  key={Math.random()}>
                  {domNode.children && domNode.children.map((child, index) => {
                    const listItem = child.children && child.children[0] ? child.children[0].data : ''; // Safe access
                    return (
                      <li className="text-[#9198a1]" key={index}>
                        {listItem}
                      </li>
                    );
                  })}
                </ul>
              );
            case 'ol':
              return (
                <ol className="pl-8 list-decimal text-[20px]" key={Math.random()}>
                  {domNode.children && domNode.children.map((child, index) => {
                    const listItem = child.children && child.children[0] ? child.children[0].data : ''; // Safe access
                    return (
                      <li className="text-[#9198a1]" key={index}>
                        {listItem}
                      </li>
                    );
                  })}
                </ol>
              );
            default:
              return domNode;
          }
        }
      },
    });
    return parsedHtml;
  };

  return (
    <div className="my-4">
      {renderParsedHTML()}
    </div>
  );
};

export default TextComponent;
