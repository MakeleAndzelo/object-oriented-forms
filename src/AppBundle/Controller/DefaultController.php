<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Post;
use AppBundle\Form\PostType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        $posts = $this->getDoctrine()->getRepository(Post::class)->findAll();

        $form = $this->createForm(PostType::class);

        return $this->render('default/index.html.twig', [
            'posts' => $posts,
            'form' => $form->createView(),
        ]);
    }
}
